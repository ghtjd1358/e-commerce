import { useQuery } from "@tanstack/react-query";
import { getOrdersForBuyerApi } from "../api";
import { ORDER_KEY } from "../key";

// buyerId를 기반으로 주문 목록을 조회하는 react-query 훅
export const useBuyerOrders = (buyerId: string) => {
  const queryKey = [ORDER_KEY, buyerId] as const;

  return useQuery({
    queryKey,
    queryFn: () => getOrdersForBuyerApi(buyerId),
  });
};
