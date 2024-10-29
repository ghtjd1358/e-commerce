import { PRODUCT_PAGE_SIZE } from "@/constants";
import { PRODUCT_KEY } from "../key";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PaginatedProductsDTO } from "../type";
import { fetchFilterProductsApi } from "../api";
import { useFilterStore } from "@/store/filter/useFilterStore";

export const useFetchInfiniteQueryProducts = ({
  pageSize = PRODUCT_PAGE_SIZE,
}) => {
  const { minPrice, maxPrice, title, categoryId } = useFilterStore();
  const filter = { minPrice, maxPrice, title, categoryId };
  const queryKey = [PRODUCT_KEY, filter] as const;

  return useInfiniteQuery<PaginatedProductsDTO, Error>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchFilterProductsApi(
        filter,
        pageSize,
        pageParam as number,
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
