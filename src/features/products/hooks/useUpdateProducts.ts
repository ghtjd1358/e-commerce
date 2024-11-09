import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductAPI } from "../api";
import { PRODUCT_KEY } from "../key";
import { useToastStore } from "@/store/toast/useToastStore";
import { IProduct } from "../type";

export const useUpdateProductsStore = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation<
    void,
    Error,
    { productId: string; updatedProduct: IProduct; existingImageUrl: string[] }
  >({
    mutationFn: ({ productId, updatedProduct, existingImageUrl }) =>
      updateProductAPI(productId, updatedProduct, existingImageUrl),
    onSuccess: () => {
      addToast("물품 업데이트 성공", "success");
      queryClient.invalidateQueries({ queryKey: [PRODUCT_KEY] });
    },
    onError: (error: Error) => {
      addToast("물품에 업데이트에 실패하였습니다", "success");
      console.log(error);
    },
  });
};
