import React from "react";
import { useFilterStore } from "@/store/filter/useFilterStore";
import { categories } from "@/shared/constants";
import { PriceRange } from "@/pages/product/components/PriceRange";
import { SortRange } from "@/pages/product/components/SortRange";

export const MainProductFilter: React.FC<{
  category: string | undefined;
}> = ({ category }) => {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice } = useFilterStore();

  const categoryName =
    categories.find((cat) => cat.name === category)?.name || "카테고리 없음";


  const handlePriceChange =
    (actionCreator: (value: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "") {
        actionCreator(-1);
      } else {
        const numericValue = Math.max(0, parseInt(value, 10));
        if (!isNaN(numericValue)) {
          actionCreator(numericValue);
        }
      }
    };

  return (
    <div className="flex justify-between items-end">
      <h1 className="text-3xl font-bold text-gold w-[30%]">
        브랜드 <span>{categoryName}</span> 
      </h1>

      <div className="flex justify-end w-[30%] mt-4 gap-6">
        <SortRange />
        <PriceRange
          onChangeMinPrice={handlePriceChange(setMinPrice)}
          onChangeMaxPrice={handlePriceChange(setMaxPrice)}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>
    </div>
  );
};
