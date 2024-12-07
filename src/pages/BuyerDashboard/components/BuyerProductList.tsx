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
import { BuyerProductCard } from "./BuyerProductCard";
import { EmptyProduct } from "@/pages/common/components/EmptyProduct";
import { useFetchProducts } from "@/features/products/hooks/useFetchProducts";
import { useBuyerOrders } from "@/features/order/hooks/useFetchOrders";
import { OrderProductCardSkeleton } from "@/pages/common/components/skeletons/OrderProductCardSkeleton";
import { Pagination } from "@/pages/common/components/Pagination";

interface ProductOrderListProps {
  buyerId: string;
}

interface Order {
  id: string;
  buyerId: string;
  productId: string;
}

export const BuyerProductList: React.FC<ProductOrderListProps> = ({
  buyerId,
}) => {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;
  const { data: products } = useFetchProducts();
  const { data: orders, isLoading: ordersLoading } = useBuyerOrders(buyerId)as {
    data: Order[] | undefined;
    isLoading: boolean;
  };

  // 클라이언트에서 페이지네이션 처리
  const totalItems = orders?.length ?? 0;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const currentData = orders
    ?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    .map((order) => {
      const product = products?.find((item) => item.id === order.productId);
      return product
        ? { ...order, productName: product.productName, productImage: product.productImage?.[0] }
        : null;
    })
    .filter(Boolean);

  const handlePageClick = (selected: number | "prev" | "next") => {
    if (typeof selected === "number") {
      setPage(selected);
    } else if (selected === "prev" && page > 1) {
      setPage((prev) => prev - 1);
    } else if (selected === "next" && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 mb-5">구매 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {ordersLoading ? (
            <Table>
              <TableBody>
                {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
                  <OrderProductCardSkeleton key={idx} />
                ))}
              </TableBody>
            </Table>
          ) : currentData && currentData.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/6 text-center">제품</TableHead>
                    <TableHead className="w-1/6 text-center">이미지</TableHead>
                    <TableHead className="w-1/6 text-center">수량</TableHead>
                    <TableHead className="w-1/6 text-center">판매자</TableHead>
                    <TableHead className="w-1/6 text-center">상태</TableHead>
                    <TableHead className="w-1/6 text-center">날짜</TableHead>
                    <TableHead className="w-1/6 text-center">주문</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.map((product) => (
                    <BuyerProductCard key={product?.id} product={product} />
                  ))}
                </TableBody>
              </Table>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onClick={handlePageClick}
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
