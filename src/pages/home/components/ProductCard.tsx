import { pageRoutes } from "@/apiRouters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

interface IProduct {
  id: string;
  productName: string;
  productPrice: number;
  productImage: string[];
  productCategory: {
    name: string;
    id: string;
  };
}

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  console.log(product);

  return (
    <Link to={`${pageRoutes.productDetail}/${product.id}`}>
      <Card className="bg-gray-800 border-gray-700 gap-y-6 min-h-[500px]">
        <CardContent className="p-4">
          <img
            src={product.productImage[0]}
            alt={product.productImage[0]}
            className="w-full h-[450px] object-cover mb-4 rounded-lg"
          />
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-yellow-500">
              {product.productName}
            </h3>
            <div className="flex items-center text-gray-400 space-x-1"></div>
          </div>
          <div className="flex justify-between items-center mb-4 mt-2">
            {" "}
            {/* 여백 조정 */}
            <span className="text-gray-300 font-bold">
              $ {product.productPrice}
            </span>
            <span className="text-gray-400">
              {product.productCategory.name}
            </span>
          </div>
          <div className="flex gap-2 mt-4">
            <Button className="flex-1 bg-gold hover:bg-gold/90 rounded-lg py-2 text-white">
              구매하기
            </Button>
            <Button className="flex-1 bg-gold hover:bg-gold/90 text-white rounded-lg py-2">
              장바구니
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
