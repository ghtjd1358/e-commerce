import { Package } from "lucide-react";
import { DeferredComponent } from "./DeferredComponent";

export const EmptyProduct = () => {
  return (
    <DeferredComponent delay={350}>
      <div className="flex flex-col items-center justify-center h-64 opacity-80">
        <Package className="w-16 h-16 text-black mb-4" />
        <h3 className="text-lg font-semibold text-black mb-2">
          상품이 없습니다
        </h3>
        <p className="text-sm text-black mb-4">새로운 상품을 구매해보세요!</p>
      </div>
    </DeferredComponent>
  );
};
