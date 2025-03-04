import React, { useState } from "react";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";
import { SellerOrderCard } from "./SellerOrderCard";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useSellerOrders } from "@/features/order/hooks/useFetchSellerOrders";
import { useFetchProducts } from "@/features/products/hooks/useFetchProducts";
import { SellerProductCardSkeleton } from "@/pages/common/components/skeletons/SellerProductCardSkeleton";
import { EmptyProduct } from "@/pages/common/components/EmptyProduct";
import { Pagination } from "@/pages/common/components/Pagination";

interface Order {
  id: string;
  buyerId: string;
  productId: string;
}

export const SellerOrderList: React.FC = () => {
  const { user } = useAuthStore();
  const { data: products } = useFetchProducts();
  const { data: orders, isLoading } = useSellerOrders(user?.uid ?? "") as {
    data: Order[] | undefined;
    isLoading: boolean;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const ordersMerge = orders?.map((order) => {
    const product = products?.find((item) => item.id === order.productId);
    return {
      ...order,
      productName: product?.productName,
      productImage: product?.productImage[0],
    };
  });

  const totalPages = Math.ceil((ordersMerge?.length || 0) / pageSize);
  const currentOrders = ordersMerge?.slice(
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
            <CardTitle className="text-black font-bold text-2xl">주문 목록</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {/* Skeleton 로딩 상태 */}
          {isLoading ? (
            Array.from({ length: pageSize }).map((_, idx) => (
              <SellerProductCardSkeleton key={idx} />
            ))
          ) : currentOrders && currentOrders.length > 0 ? (
            <>
              {/* 주문 리스트 */}
              <div className="flex flex-col space-y-2">
                {currentOrders.map((order) => (
                  <SellerOrderCard key={order.id} product={order} />
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
    </div>
  );
};
