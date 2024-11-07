import React from "react";
import { useCartStore } from "@/store/cart/useCartStore";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { CartItem } from "@/store/cart/type";
import { useMakePurchase } from "@/features/purchase/hooks/useMakePurchase";
import { Button } from "@/pages/common/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";

interface SummaryTableProps {
  totalPrice: number;
  totalCount: number;
}

export interface PurchaseDTO {
  cartData: CartItem[];
  userId: string;
}

export const SummaryTable: React.FC<SummaryTableProps> = ({
  totalPrice,
  totalCount,
}) => {
  const { cart } = useCartStore();
  const { mutate: makePurchase } = useMakePurchase();
  const cartItem = cart.map((item) => item);
  const { user } = useAuthStore();

  const handlePurchase = () => {
    if (!user?.uid) {
      return;
    }

    try {
      makePurchase({
        cartData: cartItem,
        userId: user.uid,
        // purchaseData: {
        //   totalAmount: 1,
        //   paymentMethod: "1",
        //   shippingAddress: "1",
        // },
      });
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
          <span>총 상품 수</span>
          <span className="text-white">{totalCount}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-300 pt-4">
          <span>총 상품 가격</span>
          <span className="text-white">$ {totalPrice}</span>
        </div>
        <Button onClick={handlePurchase} className="w-full bg-gray-600">
          주문하기
        </Button>
      </CardContent>
    </Card>
  );
};
