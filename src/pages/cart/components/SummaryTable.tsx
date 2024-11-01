import { pageRoutes } from "@/apiRouters";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";

interface SummaryTableProps {
  totalPrice: number;
  totalCount: number;
}

export const SummaryTable: React.FC<SummaryTableProps> = ({
  totalPrice,
  totalCount,
}) => {
  const navigate = useNavigate();

  const handlerPurchaseMove = () => {
    navigate(pageRoutes.purchase);
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
        <Button onClick={handlerPurchaseMove} className="w-full bg-gray-600">
          구매하기
        </Button>
      </CardContent>
    </Card>
  );
};
