import { useState } from "react";
import { useModal } from "@/shared/hooks/useModals";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Suspense } from "react";
import { Button } from "@/pages/common/ui/button";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";
import { SellerProductCard } from "@/pages/SellerDashboard/components/SellerProductCard";
import { SellerProductFilter } from "./SellerProductFilter";
import { SellerProductCardSkeleton } from "@/pages/common/components/skeletons/SellerProductCardSkeleton";
import { Pagination } from "@/pages/common/components/Pagination";
import { EmptyProduct } from "@/pages/common/components/EmptyProduct";
import { useFetchProducts } from "@/features/products/hooks/useFetchProducts";
import { ProductRegistrationModal } from "./ProductRegisterModal";


export const SellerProductList = ({ pageSize = 5 }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { user } = useAuthStore();

  const { data: products = [], isLoading } = useFetchProducts();

  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter((product) =>
    user?.isSeller ? product.sellerId === user.uid : true,
  );

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (page: number | "prev" | "next") => {
    if (page === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (page === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full">
      <div className="border border-gray-500 rounded-md">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle className="text-black font-bold text-2xl">판매 목록</CardTitle>
            {user?.isSeller && (
              <Button
                className="font-bold"
                variant="outline"
                onClick={openModal}
              >
                상품 등록
              </Button>
            )}
          </div>
          <SellerProductFilter />
        </CardHeader>
        <CardContent>
          {/* Skeleton 로딩 상태 */}
          {isLoading ? (
            Array.from({ length: pageSize }).map((_, idx) => (
              <SellerProductCardSkeleton key={idx} />
            ))
          ) : currentProducts.length > 0 ? (
            <>
              {/* 상품 리스트 */}
              <div className="flex flex-col space-y-2">
                {currentProducts.map((product) => (
                  <SellerProductCard
                    user={user}
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onClick={handlePageChange}
              />
            </>
          ) : (
            <EmptyProduct />
          )}
        </CardContent>
      </div>

      {/* 상품 등록 모달 */}
      <Suspense fallback={<div>Loading...</div>}>
        {isOpen && (
          <ProductRegistrationModal isOpen={isOpen} onClose={closeModal} />
        )}
      </Suspense>
    </div>
  );
};
