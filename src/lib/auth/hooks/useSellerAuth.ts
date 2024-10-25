import { useToastStore } from "@/store/toast/useToastStore";
import { useMutation } from "@tanstack/react-query";
import { setSellerStatus } from "../api";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const useSellerUser = () => {
  const { addToast } = useToastStore();
  const { user, setUser } = useAuthStore();

  return useMutation({
    mutationFn: () => {
      if (!user) throw new Error("사용자가 없습니다.");
      return setSellerStatus(user.uid, true);
    },
    onSuccess: () => {
      addToast("큰 돈 벌어봅시다!", "success");
      if (user) {
        setUser({ ...user, isSeller: true });
      }
    },
    onError: (error: Error) => {
      console.error(error);
      addToast("판매자 상태 업데이트에 실패했습니다.", "error");
    },
  });
};
