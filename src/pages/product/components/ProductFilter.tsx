import React from "react";
import { useFilterStore } from "@/store/filter/useFilterStore";
import { IProduct } from "@/features/products/type";
import { PriceRange } from "./PriceRange";
import { SortRange } from "./SortRange";
import { CategorySelectUrl } from "./CategotySelectUrl";

export const ProductFilter: React.FC<{
  category: string | undefined;
  filteredProducts: IProduct[];
  onCategoryChange: (category: string) => void;
}> = ({ category, onCategoryChange }) => {
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
    <div className="flex flex-col items-end">
      <div className="flex w-full">
        <CategorySelectUrl categoryId={category} onCategoryChange={onCategoryChange} />
      </div>

      <div className="flex justify-end mt-4 gap-6">
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
