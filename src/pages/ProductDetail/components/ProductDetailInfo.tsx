import React from "react";
import { IProduct } from "@/features/products/type";
import { Label } from "@radix-ui/react-label";
import { Minus, Plus, Star } from "lucide-react";
import { Input } from "@/pages/common/ui/input";
import { Button } from "@/pages/common/ui/button";
import { ProductDetailImage } from "./ProductDetailImage";

interface ProductDetailInfoProps {
  findProducts: IProduct;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  handlePurchaseAction: (product: IProduct, e: React.MouseEvent) => void;
  handleCartAction: (product: IProduct, e: React.MouseEvent) => void;
}

export const ProductDetailInfo: React.FC<ProductDetailInfoProps> = ({
  findProducts,
  quantity,
  setQuantity,
  handlePurchaseAction,
  handleCartAction,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProductDetailImage findProducts={findProducts} />
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gold">
          {findProducts.productName}
        </h1>
        <div className="flex items-center space-x-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 fill-gold text-gold" />
            ))}
          </div>
          <span className="text-sm text-gray-400">(24 reviews)</span>
        </div>
        <p className="text-2xl font-bold text-gold">
          ${findProducts.productPrice}
        </p>
        <p className="text-gray-400">{findProducts.productDescription}</p>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex items-center">
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
                className="w-10 m-2 text-center bg-gray-900 border-gray-700 text-gray-100"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4 text-black" />
              </Button>
            </div>
          </div>
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
  );
};
