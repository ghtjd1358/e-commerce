import { useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { PRODUCT_KEY } from "@/features/products/key";
import { fetchDetailProductApi } from "@/features/products/api";

const usePrefetchProductDetail = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const queryClient = useQueryClient();

  const handlePrefetchDetail = async (productId: string) => {
    const queryKey = [PRODUCT_KEY, { productId }];
    const cachedData = queryClient.getQueryData(queryKey);
    if (!cachedData) {
      await queryClient.prefetchQuery({
        queryKey,
        queryFn: () => fetchDetailProductApi(productId),
      });
    }
  };

  const handleMouseEnter = (productId: string) => {
    timeoutRef.current = setTimeout(() => {
      handlePrefetchDetail(productId);
    }, 1500);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return { handleMouseEnter, handleMouseLeave };
};

export default usePrefetchProductDetail;
