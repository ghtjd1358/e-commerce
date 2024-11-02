import { pageRoutes } from "@/apiRouters";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";
import { makePurchaseAPI } from "@/lib/purchase/api";
import { useCartStore } from "@/store/cart/useCartStore";
import { useAuthStore } from "@/store/auth/useAuthStore";

interface SummaryTableProps {
  totalPrice: number;
  totalCount: number;
}

export const SummaryTable: React.FC<SummaryTableProps> = ({
  totalPrice,
  totalCount,
}) => {
  const navigate = useNavigate();
  const { cart } = useCartStore();
  const cartItem = cart.map((item) => item);
  const { user } = useAuthStore();

  const handlePurchase = async () => {
    if (!user?.uid) {
      return;
    }

    try {
      await makePurchaseAPI(cartItem, user?.uid);

      // 결제 페이지로 이동
      navigate(pageRoutes.purchase);
    } catch (error) {
      console.error("구매 오류 발생:", error);
      alert("구매 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-400 font-semibold text-3xl">
          주문 예상 금액
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between font-bold text-gray-300 pt-4">
          <span>총 상품 가격</span>
          <span className="text-white">$ {totalPrice}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-300 pt-4">
          <span>총 상품 수</span>
          <span className="text-white">{totalCount}</span>
        </div>
        <Button onClick={handlePurchase} className="w-full bg-gray-600">
          구매하기
        </Button>
      </CardContent>
    </Card>
  );
};
