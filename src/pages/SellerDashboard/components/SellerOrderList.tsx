import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/pages/common/ui/table";
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
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex justify-between mb-4">
            <CardTitle className="text-yellow-500 mb-5">주문 목록</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    아이디
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    제품
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    이미지
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    수량
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    상태
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    날짜
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    상태선택
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: pageSize }, (_, index) => (
                  <SellerProductCardSkeleton key={index} />
                ))}
              </TableBody>
            </Table>
          ) : currentOrders && currentOrders.length > 0 ? (
            <>
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                      아이디
                    </TableHead>
                    <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                      제품
                    </TableHead>
                    <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                      이미지
                    </TableHead>
                    <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                      수량
                    </TableHead>
                    <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                      상태
                    </TableHead>
                    <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                      날짜
                    </TableHead>
                    <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                      상태선택
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentOrders.map((order) => (
                    <SellerOrderCard key={order.id} product={order} />
                  ))}
                </TableBody>
              </Table>
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
      </Card>
    </div>
  );
};
