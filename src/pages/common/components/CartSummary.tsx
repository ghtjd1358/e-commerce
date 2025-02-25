import React, { memo } from "react";
import { Button } from "../ui/button";

interface OrderSummaryProps {
  totalCount: number;
  totalPrice: number;
  handlePurchase: () => void;
}

export const CartSummary: React.FC<OrderSummaryProps> = memo(({
  totalCount,
  totalPrice,
  handlePurchase,
}) => {
  return (
    <section className="rounded-lg p-6 shadow-lg space-y-6">
      {/* Header */}
      <header className="border-b border-gray-700 pb-4">
        <h2 className="text-xl font-semibold">주문 예상 금액</h2>
      </header>

      {/* Summary Details */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">총 상품 수</span>
          <span className="text-lg font-bold">{totalCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">총 상품 가격</span>
          <span className="text-lg font-bold">
            {totalPrice.toLocaleString()}원
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div>
        <Button
          onClick={handlePurchase}
          className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors duration-300 mb-10"
        >
          주문하기
        </Button>
      </div>
    </section>
  );
});
