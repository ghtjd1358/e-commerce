import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { IProduct } from "@/features/products/type";
import { useFetchSearchProducts } from "@/features/products/hooks/useSearchProducts";
import { motion, AnimatePresence } from "framer-motion";
import { SearchCard } from "./Card/SearchCard";

interface SearchBarProps {
  onSearchResults: (results: IProduct[]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // 검색어 상태
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 상태
  const { data: searchResults } = useFetchSearchProducts(searchTerm); // 검색 결과 가져오기

  // 검색 결과를 부모 컴포넌트로 전달
  useEffect(() => {
    if (searchResults) {
      onSearchResults(searchResults);
    }
  }, [searchResults, onSearchResults]);

  // 모달 열기 핸들러
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const closeModal = () => {
    setIsModalOpen(false);
    setSearchTerm(""); // 검색어 초기화
  };

  return (
    <>
      <div className="relative">
        {/* 검색창 */}
        <motion.div
          className="flex items-center gap-2 rounded-lg p-2 bg-transparent"
          initial={{ width: "200px" }} 
          animate={{ width: isModalOpen ? "400px" : "200px" }} 
          transition={{ duration: 0.3 }} 
        >
          <Search className="text-gray-400" />
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="상품 검색..."
            className="w-full bg-transparent text-white focus:outline-none"
            onFocus={openModal} 
          />
        </motion.div>
      </div>

      {/* 모달 */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* 배경 오버레이 */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal} // 배경 클릭 시 모달 닫기
            ></motion.div>

            {/* 모달 본문 */}
            <motion.div
              className="fixed top-20 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[600px] bg-white rounded-lg shadow-lg z-50 p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4">검색결과</h3>
              <ul className="space-y-4">
                {searchResults?.map((product) => (
                  <li key={product.id}>
                    {/* SearchCard 컴포넌트 렌더링 */}
                    <SearchCard 
                      product={{...product}}
                      user={null} 
                    />
                  </li>
                ))}
                {!searchResults?.length && (
                  <li className="text-gray-500">검색 결과가 없습니다.</li>
                )}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
