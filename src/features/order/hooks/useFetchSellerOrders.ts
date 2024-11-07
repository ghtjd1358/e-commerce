import { useQuery } from "@tanstack/react-query";
import { getOrdersForSellerApi } from "../api";
import { SELLER_ORDER_KEY } from "../key";

// buyerId를 기반으로 주문 목록을 조회하는 react-query 훅
export const useSellerOrders = (sellerId: string) => {
  const queryKey = [SELLER_ORDER_KEY, sellerId] as const;

  return useQuery({
    queryKey,
    queryFn: () => getOrdersForSellerApi(sellerId),
  });
};
