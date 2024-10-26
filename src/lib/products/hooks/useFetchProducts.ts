import { PRODUCT_PAGE_SIZE } from "@/constants";
import { PRODUCT_KEY } from "../key";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PaginatedProductsDTO } from "../type";
import { fetchProductsApi } from "../api";
import { useFilterStore } from "@/store/filter/useFilterStore";

export const useFetchProducts = ({ pageSize = PRODUCT_PAGE_SIZE }) => {
  const { minPrice, maxPrice, title, categoryId } = useFilterStore();
  const filter = { minPrice, maxPrice, title, categoryId };
  const queryKey = [PRODUCT_KEY, filter] as const;
  return useInfiniteQuery<PaginatedProductsDTO, Error>({
    queryKey,
    refetchOnWindowFocus: false,
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchProductsApi(filter, pageSize, pageParam as number);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
