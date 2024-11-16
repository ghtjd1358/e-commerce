import { useQuery } from "@tanstack/react-query";
import { getOrdersForSellerApi } from "../api";
import { SELLER_ORDER_KEY } from "../key";

export const useSellerOrders = (sellerId: string) => {
  const queryKey = [SELLER_ORDER_KEY, sellerId] as const;

  return useQuery({
    queryKey,
    queryFn: () => getOrdersForSellerApi(sellerId),
    enabled: !!sellerId,
    // refetchOnWindowFocus: false,
  });
};
