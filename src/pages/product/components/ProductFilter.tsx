import { useFilterStore } from "@/store/filter/useFilterStore";
import { IProduct } from "@/features/products/type";
import { PriceRange } from "./PriceRange";
import { ALL_CATEGORY_ID, categories } from "@/shared/constants";
import { SortRange } from "./SortRange";
import { CategorySelectUrl } from "./CategotySelectUrl";

export const ProductFilter: React.FC<{
  totalCount: number;
  category: string | undefined;
  filteredProducts: IProduct[];
}> = ({ totalCount, category, filteredProducts }) => {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice, setSortOption } =
    useFilterStore();

  const categoryName =
    categories.find((cat) => cat.id === category)?.name || "카테고리 없음";

  const displayCount =
    category === ALL_CATEGORY_ID ? totalCount : filteredProducts.length;

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

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  return (
    <div className="flex justify-between items-end">
      <h1 className="text-3xl font-bold text-gold w-[30%]">
        브랜드 <span>{categoryName}</span> <span>( {displayCount} )</span>
      </h1>

      <div className="flex mb-12 w-[60%] pl-10 pr-10">
        <CategorySelectUrl categoryId={category} />
      </div>

      <div className="flex justify-end w-[30%] mt-4 gap-6">
        <SortRange handleSortChange={handleSortChange} />
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
