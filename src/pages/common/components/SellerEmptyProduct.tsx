import { Package } from "lucide-react";
import { Button } from "../ui/button";

interface EmptyProductProps {
  onAddProduct: () => void;
}

export const EmptyProduct = ({ onAddProduct }: EmptyProductProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-gray-700 rounded-lg">
      <Package className="w-16 h-16 text-gray-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-500 mb-2">
        등록한 상품이 없습니다
      </h3>
      <p className="text-sm text-gray-500 mb-4">새로운 상품을 등록해보세요!</p>
      <Button onClick={onAddProduct}>상품 등록하기</Button>
    </div>
  );
};
