import React from "react";
import { IProduct } from "@/features/products/type";
import { ProductDetailImage } from "./ProductDetailImage";
import { StarButton } from "@/pages/common/components/StarButton";

interface ProductDetailInfoProps {
  findProducts: IProduct;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  handlePurchaseAction: (product: IProduct, e: React.MouseEvent) => void;
  handleCartAction: (product: IProduct, e: React.MouseEvent) => void;
}

export const ProductDetailInfo: React.FC<ProductDetailInfoProps> = ({
  findProducts,
}) => {
  return (
    <>
      <div className="flex space-x-32">
        {/* 이미지 섹션 */}
        <div className="w-1/3">
          <ProductDetailImage findProducts={findProducts} />
        </div>

        {/* 상세 정보 섹션 */}
        <div className="w-2/3 p-4 space-y-6">
          <span className="text-sm text-gray-400">{findProducts.productCategory.name}</span>
          <h3 className="text-3xl font-bold text-gold">{findProducts.productName}</h3>

          {/* 저자 및 출판사 정보 */}
          <span className="text-gray-500">
            {findProducts.productAuthorName} · {findProducts.productPublisher}
          </span>

          <StarButton />

          <p className="text-2xl font-bold text-gold">
            {findProducts.productPrice.toLocaleString()} 원
          </p>

          {/* 제품 설명 */}
          <p className="text-lg text-black mb-5">{findProducts.productDescription}</p>
        </div>
      </div>
    </>
  );
};
