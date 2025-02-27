import React from "react";
import { useFilterStore } from "@/store/filter/useFilterStore";
import { PriceRange } from "@/pages/product/components/PriceRange";
import { SortRange } from "@/pages/product/components/SortRange";
import { TabRange } from "./TabRange";

export const MainProductFilter: React.FC<{
  category: string | undefined;
  setCategory: (category: string) => void; // setCategory 추가
}> = ({ category, setCategory }) => {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice } = useFilterStore();

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
      <TabRange categoryId={category} setCategory={setCategory} />
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
