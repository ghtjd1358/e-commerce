import { ProductDetailInfoSkeleton } from "./ProductDetailInfonSkeleton";

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-100">
      <div className="max-w-screen-xl mx-auto space-y-[30px] p-[20px]">
        <ProductDetailInfoSkeleton />
        {/* 추천 상품 스켈레톤 */}
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse h-[150px] w-full bg-gradient-to-r from-gray-white via-gray-white rounded"
          />
        ))}
      </div>
    </div>
  );
};
