import { useQuery } from "@tanstack/react-query";
import { fetchProductsApi } from "../api";
import { PRODUCT_KEY } from "../key";
import { IProduct } from "../type";

export const useFetchProducts = () => {
  const queryKey = [PRODUCT_KEY] as const;

  return useQuery<IProduct[], Error>({
    queryKey,
    queryFn: fetchProductsApi,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
