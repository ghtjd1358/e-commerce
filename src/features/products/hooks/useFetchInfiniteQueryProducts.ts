import { PRODUCT_PAGE_SIZE } from "@/shared/constants";
import { PRODUCT_KEY } from "../key";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PaginatedProductsDTO } from "../type";
import { fetchFilterProductsApi } from "../api";
import { useFilterStore } from "@/store/filter/useFilterStore";

export const useFetchInfiniteQueryProducts = ({
  pageSize = PRODUCT_PAGE_SIZE,
}) => {
  const { minPrice, maxPrice, title, categoryId, sortOption } =
    useFilterStore();
  const filter = { minPrice, maxPrice, title, categoryId, sortOption };
  const queryKey = [PRODUCT_KEY, filter];

  return useInfiniteQuery<PaginatedProductsDTO, Error>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        return await fetchFilterProductsApi(
          filter,
          pageSize,
          pageParam as number,
        );
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
