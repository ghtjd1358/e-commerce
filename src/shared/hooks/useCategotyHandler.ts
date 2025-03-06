// useCategoryHandler.ts
import { useQueryClient } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { ALL_CATEGORY_ID } from "../constants";
import { PRODUCT_KEY } from "@/features/products/key";

export const useCategoryHandler = () => {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState<string>(ALL_CATEGORY_ID);

  const handleClickCategory = useCallback((newCategory: string) => {
    queryClient.removeQueries({ queryKey: [PRODUCT_KEY] }); 
    setCategory(newCategory);
  }, [queryClient]);

  return { category, handleClickCategory };
};
