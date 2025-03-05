import React from "react";
import { categories } from "@/shared/constants";

interface CategorySelectGroupProps {
  categoryId?: string;
  onCategoryChange: (category: string) => void;
}

export const CategorySelectUrl: React.FC<CategorySelectGroupProps> = ({
  categoryId,
  onCategoryChange
}) => {
  return (
    <div className="flex justify-between items-center w-full border-b border-gray-300 mt-28">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.name)}
          className={`px-4 py-2 text-sm font-medium transition-all duration-300 
            ${
              category.name === categoryId
                ? "text-yellow-500 border-b-2 border-yellow-500"
                : "text-gray-500 hover:text-yellow-500 hover:border-b-2 hover:border-yellow-500"
            }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
