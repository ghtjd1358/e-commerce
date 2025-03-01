import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrderApi } from "../api";
import { useToastStore } from "@/store/toast/useToastStore";
import { ORDER_KEY } from "../key";

export const useBuyerCancelOrder = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation<void, Error, string>({
    mutationFn: cancelOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORDER_KEY] });
      addToast("구매가 최소되었습니다.", "success");
    },
    // onError: (error: Error) => {
    //   addToast("구매하여야합니다", "error");
    // },
  });
};
