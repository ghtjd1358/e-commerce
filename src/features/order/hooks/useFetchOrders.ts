import { useQuery } from "@tanstack/react-query";
import { getOrdersForBuyerApi } from "../api";
import { ORDER_KEY } from "../key";

export const useFetchOrders = (buyerId: string, statuses?: string[]) => {
  const queryKey = [ORDER_KEY, buyerId, statuses] as const;

  return useQuery({
    queryKey,
    queryFn: () => getOrdersForBuyerApi(buyerId, statuses),
    enabled: !!buyerId,
    // keepPreviousData: true,
    throwOnError: true,
  });
};
