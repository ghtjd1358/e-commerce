import React from "react";
import { IProduct } from "@/features/products/type";

interface ProductCardProps {
  product: IProduct;
  user: { uid: string } | null;
}

export const SearchCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-full h-[100px] flex flex-col sm:flex-row rounded-lg shadow-md bg-gray-300 py-7 items-center justify-center">
      {/* 이미지 */}
      <div className="flex justify-center items-center sm:w-1/4 h-20">
        <img
          src={product.productImage[0]}
          alt={product.productName}
          className="w-full h-full object-contain" 
        />
      </div>

      {/* 상품 정보 */}
      <div className="sm:w-3/4 h-20 flex flex-col flex-grow sm:pl-4">
        {/* 상품명 */}
        <div className="flex space-x-2 mb-2">
          <span className="font-semibold text-gray-700 text-lg">
            {product.productName}
          </span>
          <span className="text-gray-700 text-lg">
            {product.productAuthorName} · {product.productPublisher}
          </span>
        </div>
        {/* 가격 */}
        <div className="mb-2">
          <span className="text-gray-900 font-bold text-lg">
            {product.productPrice.toLocaleString()} 원
          </span>
        </div>
        {/* 설명 (2줄 제한) */}
        <div className="mb-2">
          <p className="text-gray-500 font-medium text-sm line-clamp-2">
            {product.productDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
