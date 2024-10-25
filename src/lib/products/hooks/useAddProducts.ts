import { useToastStore } from "@/store/toast/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IProduct, NewProductDTO } from "../type";
import { addProductAPI } from "../api";
import { PRODUCT_KEY } from "../key";

export const useAddProducts = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation<IProduct, Error, NewProductDTO>({
    mutationFn: addProductAPI,
    onSuccess: () => {
      addToast("물품 등록 성송", "success");
      queryClient.invalidateQueries({ queryKey: [PRODUCT_KEY] });
    },
    onError: (error: Error) => {
      addToast("물품 등록에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
