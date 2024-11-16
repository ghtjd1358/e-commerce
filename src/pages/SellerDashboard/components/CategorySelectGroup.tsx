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
        className="pr-8 w-[130px] border border-white rounded-md py-2 bg-gray-900 text-white shadow-sm"
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
        className="pr-8 w-[160px] border border-white rounded-md py-2 bg-gray-900 text-white shadow-sm"
      >
        <option value="" disabled>
          정렬 기준 선택
        </option>
        <option value="latest">최신순</option>
        <option value="priceAsc">가격순 (오름차순)</option>
        <option value="priceDesc">가격순 (내림차순)</option>
      </select>
    </div>
  </div>
);
