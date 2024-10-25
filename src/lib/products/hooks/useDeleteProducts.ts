import { useToastStore } from "@/store/toast/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductAPI } from "../api";
import { PRODUCT_KEY } from "../key";

export const useDeleteProducts = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation<void, Error, string>({
    mutationFn: deleteProductAPI,
    onSuccess: () => {
      addToast("물품 삭제 성공", "success");
      queryClient.invalidateQueries({ queryKey: [PRODUCT_KEY] });
    },
    onError: (error: Error) => {
      addToast("물품 삭제에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
