import { useFilterStore } from "@/store/filter/useFilterStore";
import { CategorySelectGroup } from "@/pages/productListing/components/CategorySelectGroup";

export const ProductFilter: React.FC = () => {
  const { categoryId, setCategoryId, sortOption, setSortOption } =
    useFilterStore();

  return (
    <div className="w-full flex justify-end items-center space-x-4">
      <CategorySelectGroup
        categoryId={categoryId}
        sortOption={sortOption}
        onChangeCategory={setCategoryId}
        onValueOption={setSortOption}
      />
    </div>
  );
};
