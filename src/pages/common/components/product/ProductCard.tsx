import { pageRoutes } from "@/app/apiRouters";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IProduct } from "@/features/products/type";
import "../../../../../src/app/index.css";
import { Card, CardContent } from "@/pages/common/ui/card";
import { Button } from "../../ui/button";

interface ProductCardProps {
  product: IProduct;
  cart: string[];
  onClickAddCartButton: (
    e: React.MouseEvent<HTMLButtonElement>,
    product: IProduct,
  ) => void;
  onClickPurchaseButton: (
    e: React.MouseEvent<HTMLButtonElement>,
    product: IProduct,
  ) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cart,
  onClickAddCartButton,
  onClickPurchaseButton,
}) => {
  const navigate = useNavigate();

  const handleClickMove = () => {
    navigate(pageRoutes.shoppingcart);
  };

  const handleClickAddCartButton = (
    e: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    onClickAddCartButton(e, product);
  };

  const handleClickPurchaseButton = (
    e: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    onClickPurchaseButton(e, product);
  };

  const hasCart = cart.includes(product.id);

  return (
    <Card className="bg-gray-800 border-gray-700 gap-y-6 min-h-[500px]">
      <CardContent className="p-4">
        <Link
          to={`${pageRoutes.productDetail}/${product.id}`}
          className="relative"
        >
          <img
            src={product.productImage[0]}
            alt={product.productImage[0]}
            className="w-full object-contain mb-4 rounded-lg border border-gray-400"
          />
          <h3 className="text-2xl font-semibold text-yellow-500 mt-4 relative line-clamp-2 overflow-hidden h-[60px]">
            {product.productName}
          </h3>
        </Link>
        <div className="flex justify-between items-center mb-12 mt-4">
          <span className="text-gray-300 font-bold">
            $ {product.productPrice}
          </span>
          <span className="text-gray-400">{product.productCategory.name}</span>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            className="flex-1 bg-gold hover:bg-gold/90 rounded-lg py-2 text-white bg-gray-500"
            onClick={handleClickPurchaseButton}
          >
            구매하기
          </Button>
          {hasCart ? (
            <Button
              className="flex-1 bg-gold hover:bg-gold/90 text-white rounded-lg py-2 bg-gray-700"
              onClick={handleClickMove}
            >
              장바구니 확인
            </Button>
          ) : (
            <Button
              className="flex-1 bg-gold hover:bg-gold/90 rounded-lg py-2 text-white bg-gray-600"
              onClick={handleClickAddCartButton}
            >
              장바구니 담기
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
