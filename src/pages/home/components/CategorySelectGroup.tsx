import { Button } from "@/components/ui/button";
import React from "react";
import { categories } from "@/constants";

interface CategorySelectGroupProps {
  categoryId: string;
  onChangeCategory: (value: string) => void;
}

export const CategorySelectGroup: React.FC<CategorySelectGroupProps> = ({
  categoryId,
  onChangeCategory,
}) => (
  <div className="flex p-5 gap-6 mt-4 w-[100%]">
    {categories.map((category) => (
      <Button
        className={`border border-white flex ${category.id === categoryId ? "bg-gray-700 text-white" : "bg-transparent text-gray-300"}`}
        key={category.id}
        onClick={() => onChangeCategory(category.id)}
      >
        {category.name}
      </Button>
    ))}
  </div>
);
