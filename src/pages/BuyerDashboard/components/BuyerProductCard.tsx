import React from "react";
import { OrderType } from "@/features/order/types";
import { Button } from "@/pages/common/ui/button";
import { useBuyerCancelOrder } from "@/features/order/hooks/useBuyerCancelOrder";

interface BuyerProductCardProps {
  product: Partial<OrderType> | null;
}

export const BuyerProductCard: React.FC<BuyerProductCardProps> = ({ product }) => {
  const { mutateAsync: cancelOrder } = useBuyerCancelOrder();

  const handleCancelOrderApi = async (orderId: string | undefined) => {
    if (!orderId) {
      return;
    }

    try {
      await cancelOrder(orderId);
    } catch (e) {
      console.error(e);
    }
  };

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row border rounded-lg shadow-md p-5 bg-white space-y-4 sm:space-y-0 sm:space-x-4 mr-4">
      {/* 이미지 */}
      <div className="flex justify-center sm:w-1/4">
        <img
          src={product.productImage}
          alt={product.productName}
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* 상품 정보 */}
      <div className="flex flex-col flex-grow">
        {/* 상품명 */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700 text-lg">
            {product.productName}
          </span>
        </div>

        {/* 판매자 및 수량 */}
        <div className="flex flex-col mb-5">
          <span className="text-gray-400 font-medium text-xs">
            판매자: {product.sellerId}
          </span>
          <span className="text-gray-900 font-bold text-lg">
            수량: {product.productQuantity} 개
          </span>
        </div>

        {/* 상태 및 날짜 */}
        <div className="space-x-2">
          <span className="text-gray-700 font-semibold">{product.status}</span>
        </div>
      </div>

      {/* 취소/재구매 버튼 */}
      <div className="flex justify-end items-end sm:w-auto">
        {
          product.status === "주문 완료" ? <Button 
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded"
          onClick={() => handleCancelOrderApi(product.id)}
        >
          구매 취소
        </Button> : <p className="text-red-500 tracking-wider">주문이 취소되었습니다</p>
        }
      </div>
    </div>
  );
};
