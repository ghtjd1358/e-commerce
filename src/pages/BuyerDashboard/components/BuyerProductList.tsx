import React, { useState, useMemo } from "react";
import { CardContent, CardHeader, CardTitle } from "@/pages/common/ui/card";
import { BuyerProductCard } from "./BuyerProductCard";
import { EmptyProduct } from "@/pages/common/components/EmptyProduct";
import { useFetchProducts } from "@/features/products/hooks/useFetchProducts";
import { useFetchOrders } from "@/features/order/hooks/useFetchOrders";
import { Pagination } from "@/pages/common/components/Pagination";
import { MypageCardSkeleton } from "@/pages/common/components/skeletons/MypageCardSkeleton";

interface ProductOrderListProps {
  buyerId: string;
}

export const BuyerProductList: React.FC<ProductOrderListProps> = ({ buyerId }) => {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;
  const { data: products } = useFetchProducts();
  const { data: orders, isLoading: ordersLoading } = useFetchOrders(buyerId, ["주문 완료", "주문 취소"]);

  const groupedOrders = useMemo(() => {
    if (!orders || !products) return {};
    
    return orders.reduce((acc, order) => {
      const product = products.find(item => item.id === order.productId);
      if (!product) return acc;
      
      const date = new Date(order.updatedAt).toLocaleDateString();

      if (!acc[date]) acc[date] = [];
      acc[date].push({ ...order, productName: product.productName, productImage: product.productImage?.[0] });
      return acc;
    }, {});
  }, [orders, products]);

  const sortedDates = useMemo(() => {
    return Object.keys(groupedOrders).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  }, [groupedOrders]);

  const paginatedDates = sortedDates.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalPages = Math.ceil(sortedDates.length / PAGE_SIZE);

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
      <div className=" border border-gray-500 rounded-md">
        <CardHeader>
          <CardTitle className="text-black-500 font-bold text-2xl mb-5">구매 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {ordersLoading ? (
            Array.from({ length: PAGE_SIZE }).map((_, idx) => (
              <MypageCardSkeleton key={idx} />
            ))
          ) : (
            <>
              {paginatedDates.length > 0 ? (
                <>
                  {paginatedDates.map(date => (
                    <div key={date} className="mb-6">
                      <h3 className="text-lg font-semibold text-black mb-3">{date}</h3>
                      <div className="flex flex-col space-y-2">
                        {groupedOrders[date].map(product => (
                          <BuyerProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  ))}
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onClick={handlePageClick}
                  />
                </>
              ) : (
                <EmptyProduct />
              )}
            </>
          )}
        </CardContent>
      </div>
    </div>
  );  
};
