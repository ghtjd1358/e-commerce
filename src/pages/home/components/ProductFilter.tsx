import { useFilterStore } from "@/store/filter/useFilterStore";
import { PriceRange } from "./PriceRange";
import { CategorySelectGroup } from "./CategorySelectGroup";
import { Link } from "react-router-dom";
import { pageRoutes } from "@/apiRouters";

export const ProductFilter: React.FC = () => {
  const {
    title,
    minPrice,
    maxPrice,
    categoryId,
    setMinPrice,
    setMaxPrice,
    setCategoryId,
  } = useFilterStore();

  console.log("타이틀", title);

  const handlePriceChange =
    (action: (value: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      action(!isNaN(value) && value >= 0 ? value : -1);
    };

  return (
    <div className=" flex justify-between mb-8">
      <div className="flex gap-6">
        <CategorySelectGroup
          categoryId={categoryId}
          onChangeCategory={setCategoryId}
        />

        <PriceRange
          onChangeMinPrice={handlePriceChange(setMinPrice)}
          onChangeMaxPrice={handlePriceChange(setMaxPrice)}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>
      <div>
        <Link to={pageRoutes.cfproduct}>더보기</Link>
      </div>
    </div>
  );
};
