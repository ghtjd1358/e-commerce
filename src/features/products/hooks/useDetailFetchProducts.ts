// useDetailFetchProducts.ts
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "@/features/products/type";
import { PRODUCT_KEY } from "../key";
import { fetchDetailProductApi } from "../api";

export const useDetailFetchProducts = (productId: string | undefined) => {
  return useQuery<IProduct, Error>({
    queryKey: [PRODUCT_KEY, productId],
    queryFn: () => {
      if (!productId) throw new Error("Product ID가 필요합니다.");
      return fetchDetailProductApi(productId);
    },
    enabled: !!productId,
  });
};
