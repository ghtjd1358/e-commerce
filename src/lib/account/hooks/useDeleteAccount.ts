import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAccountApi } from "../api";
import { ACCOUNT_KEY } from "../key";
import { useToastStore } from "@/store/toast/useToastStore";

export const useDeleteAccountStore = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation<void, Error, string>({
    mutationFn: (uid) => deleteAccountApi(uid),
    onSuccess: () => {
      addToast("계정이 삭제되었습니다!", "success");
      queryClient.invalidateQueries({ queryKey: [ACCOUNT_KEY] });
    },
    onError: (error: Error) => {
      addToast("계정 삭제에 실패했습니다!", "error");
      console.error(error);
    },
  });
};
