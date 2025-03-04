import React from "react";
import { categories } from "@/shared/constants";

interface CategorySelectGroupProps {
  categoryId: string;
  sortOption: string;
  onChangeCategory: (value: string) => void;
  onValueOption: (value: string) => void;
}

export const CategorySelectGroup: React.FC<CategorySelectGroupProps> = ({
  categoryId,
  sortOption,
  onChangeCategory,
  onValueOption,
}) => (
  <div className="flex mt-4 space-x-4 text-gray-400">
    {/* Category Select */}
    <div className="relative">
      <select
        id="category-select"
        value={categoryId}
        onChange={(e) => onChangeCategory(e.target.value)}
        className="pr-8 w-[130px] border border-gray-300 rounded-md py-2 bg-white text-black"
      >
        <option value="" disabled>
          카테고리를 선택하세요
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>

    {/* Sort Option Select */}
    <div className="relative">
      <select
        id="sort-select"
        value={sortOption}
        onChange={(e) => onValueOption(e.target.value)}
        className="pr-8 w-[160px] border border-gray-300 rounded-md py-2 bg-white text-black" 
      >
        <option value="" disabled>
          정렬 기준 선택
        </option>
        <option value="latest">최신</option>
        <option value="priceAsc">낮은가격</option>
        <option value="priceDesc">높은가격</option>
      </select>
    </div>
  </div>
);
