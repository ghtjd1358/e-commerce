import { useFilterStore } from "@/store/filter/useFilterStore";
import { PriceRange } from "../../common/components/PriceRange";
import { CategorySelectUrl } from "./CategotySelectUrl";
import { ALL_CATEGORY_ID, categories } from "@/constants";
import { IProduct } from "@/lib/products/type";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
// import { SearchBar } from "@/pages/common/components/SearchBar";

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
    (action: (value: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      action(!isNaN(value) && value >= 0 ? value : -1);
    };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  return (
    <div className="flex justify-between items-end">
      <h1 className="text-3xl font-bold text-gold w-[35%]">
        브랜드 <span>{categoryName}</span> <span>( {displayCount} )</span>
      </h1>

      <div className="flex mb-12 w-[45%]">
        <CategorySelectUrl categoryId={category} />
      </div>

      <div className="flex justify-end w-[40%] space-y-1 mt-4">
        <div className="flex items-center space-x-2 text-gray-400">
          <Select onValueChange={handleSortChange}>
            <SelectTrigger
              id="sort-select"
              className="border border-gray-300 rounded p-2"
            >
              <SelectValue placeholder="정렬 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="oldest">오래된 순</SelectItem>
              <SelectItem value="priceAsc">가격 오름차순</SelectItem>
              <SelectItem value="priceDesc">가격 내림차순</SelectItem>
              <SelectItem value="titleAsc">타이틀 오름차순</SelectItem>
              <SelectItem value="titleDesc">타이틀 내림차순</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
