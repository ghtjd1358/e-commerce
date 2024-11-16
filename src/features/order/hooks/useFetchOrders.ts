import { useQuery } from "@tanstack/react-query";
import { getOrdersForBuyerApi } from "../api";
import { ORDER_KEY } from "../key";

export const useBuyerOrders = (buyerId: string) => {
  const queryKey = [ORDER_KEY, buyerId] as const;

  return useQuery({
    queryKey,
    queryFn: () => getOrdersForBuyerApi(buyerId),
    enabled: !!buyerId,
    // refetchOnMount: false,
    // refetchInterval: false,
    // refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 60 * 24,
    throwOnError: true,
  });
};
