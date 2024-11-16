import { useQuery } from "@tanstack/react-query";
import { fetchSearchProductsApi } from "../api";
import { PRODUCT_KEY } from "../key";
import { IProduct } from "../type";

export const useFetchSearchProducts = (searchTerm: string) => {
  const queryKey = [PRODUCT_KEY, searchTerm] as const;

  return useQuery<IProduct[], Error>({
    queryKey,
    queryFn: async () => {
      if (!searchTerm.trim()) return [];
      const { products } = await fetchSearchProductsApi(searchTerm, 10, 1);
      return products;
    },
  });
};
