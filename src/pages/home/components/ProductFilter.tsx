import { useFilterStore } from "@/store/filter/useFilterStore";
import { PriceRange } from "./PriceRange";
import { CategorySelectGroup } from "./CategorySelectGroup";

export const ProductFilter: React.FC = ({ totalCount }) => {
  const {
    minPrice,
    maxPrice,
    categoryId,
    setMinPrice,
    setMaxPrice,
    setCategoryId,
  } = useFilterStore();

  const handlePriceChange =
    (action: (value: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      action(!isNaN(value) && value >= 0 ? value : -1);
    };

  return (
    <div className="flex justify-between items-end">
      <h1 className="text-3xl font-bold text-gold gap-2">
        안경 <span>레몬에이드</span>
        <span>( {totalCount} )</span>
      </h1>

      <div className="flex mb-24">
        <CategorySelectGroup
          categoryId={categoryId}
          onChangeCategory={setCategoryId}
        />
      </div>

      <div className="flex">
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
