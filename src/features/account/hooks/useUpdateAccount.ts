import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAccountApi } from "../api";
import { ACCOUNT_KEY } from "../key";
import { useToastStore } from "@/store/toast/useToastStore";
import { IUser, GoogleUser } from "../type";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/app/apiRouters";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const useUpdateAccountStore = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  return useMutation<
    void,
    Error,
    { uid: string; updatedData: Partial<IUser | GoogleUser> }
  >({
    mutationFn: ({ uid, updatedData }) => updateAccountApi(uid, updatedData),
    onSuccess: () => {
      addToast("회원 정보가 변경됐습니다!", "success");

      if (!user) {
        return;
      }

      if (user.isSeller) {
        navigate(pageRoutes.sellerdashboard);
      } else {
        navigate(pageRoutes.buyerdashboard);
      }

      queryClient.invalidateQueries({ queryKey: [ACCOUNT_KEY] });
    },
    onError: (error: Error) => {
      addToast("회원 정보 변경 실패: " + error.message, "error");
      console.error("Error updating account:", error);
    },
  });
};
