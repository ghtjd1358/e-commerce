import { PRODUCT_PAGE_SIZE } from "@/constants";
import { PRODUCT_KEY } from "../key";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PaginatedProductsDTO } from "../type";
import { fetchProducts } from "../api";

export const useFetchProducts = ({ pageSize = PRODUCT_PAGE_SIZE }) => {
  const queryKey = [PRODUCT_KEY] as const;

  return useInfiniteQuery<PaginatedProductsDTO, Error>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchProducts(pageSize, pageParam as number);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
