import { useFilterStore } from "@/store/filter/useFilterStore";
import { PriceRange } from "../../common/components/PriceRange";
import { CategorySelectUrl } from "./CategotySelectUrl";
import { categories } from "@/constants";
import { IProduct } from "@/lib/products/type";

export const ProductFilter: React.FC<{
  totalCount: number;
  category: string;
  filteredProducts: IProduct[];
}> = ({ totalCount, category, filteredProducts }) => {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice } = useFilterStore();

  const categoryName =
    categories.find((cat) => cat.id === category)?.name || "카테고리 없음";

  const displayCount = category === "-1" ? totalCount : filteredProducts.length;

  const handlePriceChange =
    (action: (value: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      action(!isNaN(value) && value >= 0 ? value : -1);
    };

  return (
    <div className="flex justify-between items-end">
      <h1 className="text-3xl font-bold text-gold gap-2">
        Gun <span>{categoryName}</span>
        <span>( {displayCount} )</span>
      </h1>

      <div className="flex mb-24">
        <CategorySelectUrl categoryId={category} />
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
