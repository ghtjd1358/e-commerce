import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";
import { OrderType } from "@/features/order/types";

interface CheckoutProductTableProps {
  buyer: (Partial<OrderType> | null)[];
}

export const CheckoutProductTable: React.FC<CheckoutProductTableProps> = ({
  buyer,
}) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-yellow-500 font-semibold text-2xl">
          주문 상품
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {buyer?.map((item) =>
          item?.status === "결제 대기" ? (
            <div className="w-full flex justify-between" key={item.id}>
              <span className="text-white">{item.productName}</span>
              <span className="text-white">{item.productQuantity} 개</span>
            </div>
          ) : null,
        )}
      </CardContent>
    </Card>
  );
};
