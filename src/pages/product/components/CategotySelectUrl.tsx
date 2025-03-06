import React from "react";
import { ALL_CATEGORY_ID, categories } from "@/shared/constants";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/pages/common/ui/button";
import { useCategoryHandler } from "@/shared/hooks/useCategotyHandler";

interface CategorySelectGroupProps {
  categoryId: string | undefined;
}

export const CategorySelectUrl: React.FC<CategorySelectGroupProps> = ({
  categoryId,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleClickCategory } = useCategoryHandler();

  const handleCategoryChange = (newCategoryId: string) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(
      "category",
      newCategoryId === ALL_CATEGORY_ID ? ALL_CATEGORY_ID : newCategoryId,
    );
    setSearchParams(updatedParams);
    handleClickCategory(newCategoryId);
  };

  return (
    <div className="flex justify-between p-6 w-full">
      {categories.map((category) => (
        <Button
          key={category.id}
          onClick={() => handleCategoryChange(category.name)}
          variant="ghost"
          className={`flex flex-col items-center transition-all duration-300 
            ${
              category.name === categoryId
                ? "text-yellow-500"
                : "text-gray-300 hover:text-yellow-500"
            }`}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};
