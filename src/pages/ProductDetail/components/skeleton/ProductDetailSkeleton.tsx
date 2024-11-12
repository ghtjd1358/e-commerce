import { ProductDetailInfoSkeleton } from "./ProductDetailInfonSkeleton";

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto space-y-8">
        <ProductDetailInfoSkeleton />
        <div className="animate-pulse h-20 w-4/4 bg-gray-600 rounded" />
      </div>
    </div>
  );
};
