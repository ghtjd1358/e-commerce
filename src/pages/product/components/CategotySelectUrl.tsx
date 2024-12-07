import React from "react";
import { ALL_CATEGORY_ID, categories } from "@/shared/constants";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/pages/common/ui/button";

interface CategorySelectGroupProps {
  categoryId: string | undefined;
}

export const CategorySelectUrl: React.FC<CategorySelectGroupProps> = ({
  categoryId,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategoryChange = (newCategoryId: string) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(
      "category",
      newCategoryId === ALL_CATEGORY_ID ? ALL_CATEGORY_ID : newCategoryId,
    );
    setSearchParams(updatedParams);
  };

  return (
    <div className="flex justify-between p-6 w-full">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.id)}
          className="flex flex-col items-center group"
        >
          {category.img && (
            <img
              src={category.img}
              alt={category.name}
              className={`w-16 h-16 mb-2 border rounded-full object-center transition-all duration-300 
                ${
                  category.id === categoryId
                    ? "border-2 border-yellow-600"
                    : "border-gray-600"
                } 
                group-hover:border-yellow-600 border-2
                `
              }
            />
          )}
          <Button
            variant={null}
            className={`flex transition-all duration-300 
              ${
                category.id === categoryId
                  ? "text-yellow-500"
                  : "text-gray-300 group-hover:text-yellow-500"
              }`}
          >
            {category.name}
          </Button>
        </button>
      ))}
    </div>
  );
};
