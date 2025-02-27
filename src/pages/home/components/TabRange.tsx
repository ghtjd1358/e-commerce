import React from "react";
import { categories } from "@/shared/constants";
import { Button } from "@/pages/common/ui/button";

export const TabRange: React.FC<{
    categoryId: string | undefined;
    setCategory: (category: string) => void; 
  }> = ({ categoryId, setCategory }) => {

    const handleCategoryChange = (categoryName: string) => {
      setCategory(categoryName); 
    };
  
    return (
      <div className="flex justify-between p-6 w-full">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.name)} 
            className="flex flex-col items-center group"
          >
            <Button
              variant={null}
              className={`flex transition-all duration-300 
                ${
                  category.name === categoryId
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
  