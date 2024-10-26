import { Label } from "@/components/ui/label";
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
  onChangeCategory: (value: string) => void;
}

export const CategorySelectGroup: React.FC<CategorySelectGroupProps> = ({
  categoryId,
  onChangeCategory,
}) => (
  <div className="flex flex-col space-y-2 mt-4">
    <Label htmlFor="category-select" className="ml-3 space-y-2 mb-2">
      카테고리 선택
    </Label>
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
  </div>
);
