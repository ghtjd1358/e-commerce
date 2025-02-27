import React from "react";
import { SlideCard } from "@/pages/common/components/Card/SlideCard";

interface SlideContentProps {
  product: any;
}

export const MainSlideContent: React.FC<SlideContentProps> = ({ product }) => {
  return (
    <div className="flex transition-transform duration-500">
      {product ? (
        <SlideCard product={product} />
      ) : (
        <p className="text-gray-400">상품 정보가 없습니다.</p>
      )}
    </div>
  );
};
