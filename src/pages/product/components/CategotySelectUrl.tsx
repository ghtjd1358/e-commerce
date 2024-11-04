import React from "react";
import { categories } from "@/shared/constants";
import { Link } from "react-router-dom";
import { pageRoutes } from "@/app/apiRouters";
import { Button } from "@/pages/common/ui/button";

interface CategorySelectGroupProps {
  categoryId: string | undefined;
}

export const CategorySelectUrl: React.FC<CategorySelectGroupProps> = ({
  categoryId,
}) => (
  <div className="flex justify-between p-6 w-full">
    {categories.map((category) => (
      <Link
        to={`${pageRoutes.product}/${category.id}`}
        key={category.id}
        className="flex flex-col items-center"
      >
        {category.img && (
          <img
            src={category.img}
            alt={category.name}
            className={`w-16 h-16 mb-2 border rounded-full object-center ${category.id === categoryId ? "border-2 border-yellow-600" : " border-gray-600"}`}
          />
        )}
        <Button
          variant={null}
          className={`flex ${category.id === categoryId ? "text-yellow-500" : "text-gray-300"}`}
        >
          {category.name}
        </Button>
      </Link>
    ))}
  </div>
);
