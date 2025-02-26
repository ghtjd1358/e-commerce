import React from "react";
import { IProduct } from "@/features/products/type";

interface ProductCardProps {
  product: IProduct;
  user: { uid: string } | null;
}

export const SearchCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-full flex flex-col sm:flex-row rounded-lg shadow-md bg-gray-300 p-4 border border-red-500">
      {/* 이미지 */}
      <div className="flex justify-center items-center sm:w-1/3 h-32 border border-blue-500">
        <img
          src={product.productImage[0]}
          alt={product.productName}
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* 상품 정보 */}
      <div className="sm:w-2/3 flex flex-col flex-grow sm:pl-4 border border-green-500">
        {/* 카테고리 */}
        <div className="mb-1">
          <span className="text-gray-500 font-medium text-sm">
            {product.productCategory.name}
          </span>
        </div>
        {/* 상품명 */}
        <div className="mb-2">
          <span className="font-semibold text-gray-700 text-lg">
            {product.productName}
          </span>
        </div>
        {/* 저자 및 출판사 */}
        <div className="mb-2">
          <span className="text-gray-500 font-medium text-sm">
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
