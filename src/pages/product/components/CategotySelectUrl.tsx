import { Button } from "@/components/ui/button";
import React from "react";
import { categories } from "@/constants";
import { Link } from "react-router-dom";
import { pageRoutes } from "@/apiRouters";

interface CategorySelectGroupProps {
  categoryId: string;
}

export const CategorySelectUrl: React.FC<CategorySelectGroupProps> = ({
  categoryId,
}) => (
  <div className="flex p-5 gap-6 mt-4 w-[100%]">
    {categories.map((category) => (
      <Link to={`${pageRoutes.cfproduct}/${category.id}`} key={category.id}>
        <Button
          className={`border border-white flex ${category.id === categoryId ? "bg-gray-700 text-white" : "bg-transparent text-gray-300"}`}
        >
          {category.name}
        </Button>
      </Link>
    ))}
  </div>
);
