import React from "react";
import { IProduct } from "@/features/products/type";

interface ProductCardProps {
  product: IProduct;
  user: { uid: string } | null;
}

export const SearchCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-full h-[110px] flex flex-col sm:flex-row shadow-xl bg-gray-100 py-7 items-center justify-center">
      {/* 이미지 */}
      <div className="sm:w-1/6 h-24">
        <img
          src={product.productImage[0]}
          alt={product.productName}
          className="w-full h-full object-contain" 
        />
      </div>

      {/* 상품 정보 */}
      <div className="sm:w-5/6 h-20 sm:pl-4">
        {/* 상품명 */}
        <div className="flex space-x-3 items-center">
          <span className="text-lg font-semibold">
            {product.productName}
          </span>
          <span className="text-sm text-gray-500">
            {product.productAuthorName} · {product.productPublisher}
          </span>
        </div>
        {/* 가격 */}
        <div className="mb-2">
          <span className="block mt-1 rounded text-sm font-bold">
            {product.productPrice.toLocaleString()} 원
          </span>
        </div>
        {/* 설명 (2줄 제한) */}
        <div className="mb-2">
          <p className="text-sm text-gray-700 line-clamp-1">
            {product.productDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
