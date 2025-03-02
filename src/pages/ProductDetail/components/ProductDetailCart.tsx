import React from "react";
import { Button } from "@/pages/common/ui/button";
import { Input } from "@/pages/common/ui/input";
import { IProduct } from "@/features/products/type";
import { Minus, Plus } from "lucide-react";

interface ProductDetailCartProps {
  findProducts: IProduct;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  handlePurchaseAction: (product: IProduct, e: React.MouseEvent) => void;
  handleCartAction: (product: IProduct, e: React.MouseEvent) => void;
}

export const ProductDetailCart: React.FC<ProductDetailCartProps> = ({
  findProducts,
  quantity,
  setQuantity,
  handlePurchaseAction,
  handleCartAction,
}) => {
  // 총 상품 금액 계산
  const totalPrice = findProducts.productPrice * quantity;

  return (
    <>
      {/* 총 상품 금액 및 수량 조정 */}
      <div className="w-full  fixed left-0 bottom-0 bg-gray-100 border-t border-gray-400 p-4">
        <div className="flex justify-between max-w-screen-xl mx-auto">
        <div className="flex gap-7">
            <span className="text-lg font-bold text-gray-700">총 상품 금액</span>
            <span className="text-black text-xl font-bold">{totalPrice.toLocaleString()} 원</span>
          
        </div>

        <div className="flex items-center space-x-6">
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4 text-black" />
          </Button>
          <Input
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-16 text-center bg-gray-100 border-gray-300 text-gray-800"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4 text-black" />
          </Button>
        </div>
        <div className="flex space-x-4">
        <Button
          onClick={(e) => handlePurchaseAction(findProducts, e)}
          className="flex-1 bg-gray-600 hover:bg-gold/90 text-white"
        >
          구매하기
        </Button>
        <Button
          onClick={(e) => handleCartAction(findProducts, e)}
          className="flex-1 bg-gray-700 hover:bg-gold/90 text-white"
        >
          장바구니
        </Button>
      </div>
      </div>
      </div>
      </div>
    </>
  );
};
