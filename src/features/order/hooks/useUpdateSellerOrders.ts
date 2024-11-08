import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatusApi } from "../api";
import { useToastStore } from "@/store/toast/useToastStore";
import { ORDER_KEY } from "../key";
import { OrderStatus } from "../types";

// 수정된 useUpdateOrderStatus 훅
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation<void, Error, { orderId: string; newStatus: OrderStatus }>({
    mutationFn: ({ orderId, newStatus }) =>
      updateOrderStatusApi(orderId, newStatus),
    onSuccess: () => {
      addToast("상태가 변경되었습니다.", "success");
      queryClient.invalidateQueries({ queryKey: [ORDER_KEY] });
    },
    onError: (error: Error) => {
      addToast("상태 변경이 불가능합니다.", "error");
      console.error("주문 상태 변경 중 오류 발생:", error.message);
    },
  });
};
