import React from "react";
import { IProduct } from "@/features/products/type";

interface ProductCardProps {
  product: IProduct;
  user: { uid: string } | null;
}

export const SearchCard: React.FC<ProductCardProps> = ({
  product,
}) => {

  return (
    <div className="w-full flex flex-col sm:flex-row rounded-lg shadow-md space-y-2 sm:space-y-0 sm:space-x-4 bg-gray-300 p-2">
      <div className="flex justify-center sm:w-1/4">
        <img
          src={product.productImage[0]}
          alt={product.productName}
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* 상품 정보 */}
      <div className="flex flex-col flex-grow space-y-4">
        {/* 체크박스 및 상품명 */}
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 text-lg">
            {product.productName}
          </span>
        </div>

        {/* 카테고리 및 가격 */}
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium text-sm">
            {product.productCategory.name}
          </span>
          <span className="text-gray-500 font-medium text-sm">{product.productDescription}</span>
          <span className="text-gray-900 font-bold text-lg">
            {product.productPrice.toLocaleString()} 원
          </span>
        </div>

      </div>
    </div>
  );
};
