import { PRODUCT_PAGE_SIZE } from "@/shared/constants";
import { PRODUCT_KEY } from "../key";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { PaginatedProductsDTO } from "../type";
import { fetchFilterProductsApi } from "../api";
import { useFilterStore } from "@/store/filter/useFilterStore";

export const useFetchInfiniteQueryProducts = ({
  pageSize = PRODUCT_PAGE_SIZE,
}) => {
  const queryClient = useQueryClient();
  const { minPrice, maxPrice, title, categoryId, sortOption, setCategoryId } =
    useFilterStore();
  const filter = { minPrice, maxPrice, title, categoryId, sortOption };
  const queryKey = [PRODUCT_KEY, filter];

  const infiniteQuery = useInfiniteQuery<PaginatedProductsDTO, Error>({
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
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      products: data.pages.flatMap(page => page.products),
    }),
  });

  const resetCategoryQuery = (newCategoryId: string) => {
    setCategoryId(newCategoryId);
    queryClient.removeQueries({ queryKey: [PRODUCT_KEY, { ...filter, categoryId: newCategoryId }] });
  };

  return { infiniteQuery, resetCategoryQuery };
};
