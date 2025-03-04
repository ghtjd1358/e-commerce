import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { IProduct } from "@/features/products/type";
import { useFetchSearchProducts } from "@/features/products/hooks/useSearchProducts";
import { motion, AnimatePresence } from "framer-motion";
import { SearchCard } from "./Card/SearchCard";
import { useModal } from "@/shared/hooks/useModals";

interface SearchBarProps {
  onSearchResults: (results: IProduct[]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const { isOpen, toggleModal } = useModal();
  const { data: searchResults } = useFetchSearchProducts(searchTerm);

  // 검색 결과를 부모 컴포넌트로 전달
  useEffect(() => {
    if (searchResults) {
      onSearchResults(searchResults);
    }
  }, [searchResults, onSearchResults]);

  // 모달 닫힐 때 검색어 초기화
  const handleCloseModal = () => {
    toggleModal(); 
    setSearchTerm(""); 
  };

  return (
    <>
      {/* 검색창 */}
      <div className="relative z-50">
        <motion.div
          className="flex items-center gap-2 rounded-lg bg-white shadow-md py-1 px-4"
          initial={{ width: "200px" }}
          animate={{ width: isOpen ? "400px" : "200px" }}
          transition={{ duration: 0.3 }}
        >
          {/* 검색 입력 필드 */}
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="w-full border-none focus:outline-none text-black"
            onFocus={toggleModal}
          />
          <Search className="text-gray-500" />
        </motion.div>
      </div>

      {/* 모달 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 배경 오버레이 */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-80 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleCloseModal}
            ></motion.div>

            {/* 모달 본문 */}
            <div className="relative">
            <motion.div
              className="absolute top-10 -right-48  w-[90%] md:w-[600px] bg-white rounded-lg shadow-lg z-50 p-6 max-h-[80vh] overflow-y-auto"
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
                    <SearchCard product={{ ...product }} user={null} />
                  </li>
                ))}
                {!searchResults?.length && (
                  <li className="text-gray-500">검색 결과가 없습니다.</li>
                )}
              </ul>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
