import { pageRoutes } from "@/app/apiRouters";
import React from "react";
import { Link } from "react-router-dom";

interface SlideCardProps {
  product: {
    id: string;
    productImage: string;
    productName: string;
    productPrice: number;
    productPublisher: string;
    productAuthorName: string;
    productDescription: string;
  };
}

export const SlideCard: React.FC<SlideCardProps> = ({ product }) => {
  return (
    <Link
      to={`${pageRoutes.productDetail}/${product.id}`}
      className="max-w-screen-xl flex items-center gap-7 mt-5" 
    >
      {/* 이미지 섹션 */}
      <div className="w-1/5 flex items-center justify-center">
        <img
          src={product.productImage}
          alt={product.productName}
          className="w-full h-[360px] object-fill mb-4 rounded-lg border border-gray-700"
        />
      </div>

      {/* 텍스트 섹션 */}
      <div className="w-4/5 h-[350px] text-left">
        {/* 상품명 */}
        <div className="mb-2">
          <h1 className="text-4xl font-bold">{product.productName}</h1>
        </div>

        {/* 저자 및 출판사 */}
        <div className="mb-3">
          <span className="text-xl text-black text-gold">
            {product.productAuthorName} · {product.productPublisher}
          </span>
        </div>

        {/* 가격 */}
        <div className="mb-6">
          <span className="text-2xl block mt-2 rounded font-bold">
            {product.productPrice.toLocaleString()} 원
          </span>
        </div>

        {/* 설명 */}
        <div>
          <p className="text-xl text-black line-clamp-5">{product.productDescription}</p>
        </div>
      </div>
    </Link>
  );
};
