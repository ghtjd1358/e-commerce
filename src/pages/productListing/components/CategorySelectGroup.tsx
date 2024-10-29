import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/constants";
import React from "react";

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
    <Select value={categoryId} onValueChange={onChangeCategory}>
      <SelectTrigger
        id="category-select"
        className="pr-8 w-[130px] border !border-white rounded-md shadow-sm"
      >
        <SelectValue placeholder="카테고리를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem
            className="border border-white"
            key={category.id}
            value={category.id}
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Select value={sortOption} onValueChange={onValueOption}>
      <SelectTrigger className="pr-8 w-[160px] border !border-white rounded-md shadow-sm">
        <SelectValue placeholder="정렬 기준 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="latest">최신순</SelectItem>
        <SelectItem value="priceAsc">가격순 (오름차순)</SelectItem>
        <SelectItem value="priceDesc">가격순 (내림차순)</SelectItem>
      </SelectContent>
    </Select>
  </div>
);
