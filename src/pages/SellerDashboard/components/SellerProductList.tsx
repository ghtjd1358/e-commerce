import React, { useState } from "react";
import { useModal } from "@/shared/hooks/useModals";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Suspense } from "react";
import { useFetchInfiniteQueryProducts } from "@/features/products/hooks/useFetchInfiniteQueryProducts";
import { Button } from "@/pages/common/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";
import { ProductRegistrationModal } from "@/pages/SellerDashboard/components/ProductRegisterModal";
import { SellerProductCard } from "@/pages/SellerDashboard/components/SellerProductCard";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from "@/pages/common/ui/table";
import { SellerProductFilter } from "./SellerProductFilter";
import { SellerProductCardSkeleton } from "@/pages/common/components/skeletons/SellerProductCardSkeleton";
import { SellerEmptyProduct } from "@/pages/common/components/SellerEmptyProduct";
import { Pagination } from "@/pages/common/components/Pagination";

export const SellerProductList = ({ pageSize = 5 }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { user } = useAuthStore();

  const { data, isLoading } = useFetchInfiniteQueryProducts({ pageSize });

  const [currentPage, setCurrentPage] = useState(1);

  const allProducts = data ? data.pages.flatMap((page) => page.products) : [];
  const filteredProducts = allProducts.filter((product) =>
    user?.isSeller ? product.sellerId === user.uid : true,
  );

  // Calculate pagination
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
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex justify-between mb-4 ">
            <CardTitle className="text-yellow-500 mb-5">판매 목록</CardTitle>

            {user?.isSeller && (
              <Button
                className=" font-bold"
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
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/6 text-center">
                  ID
                </TableHead>
                <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/4 text-center">
                  제품
                </TableHead>
                <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/5 text-center">
                  가격
                </TableHead>
                <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/5 text-center">
                  수량
                </TableHead>
                <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/5 text-center">
                  이미지
                </TableHead>
                <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/4 text-center">
                  날짜
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <>
                  {Array.from({ length: pageSize }, (_, index) => (
                    <SellerProductCardSkeleton key={index} />
                  ))}
                </>
              ) : currentProducts.length === 0 ? (
                <SellerEmptyProduct onAddProduct={() => {}} />
              ) : (
                currentProducts.map((product) => (
                  <SellerProductCard
                    user={user}
                    key={product.id}
                    product={product}
                  />
                ))
              )}
            </TableBody>
          </Table>
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onClick={handlePageChange}
          />
        </CardContent>
      </Card>

      <Suspense fallback={<div>Loading...</div>}>
        {isOpen && (
          <ProductRegistrationModal isOpen={isOpen} onClose={closeModal} />
        )}
      </Suspense>
    </div>
  );
};
