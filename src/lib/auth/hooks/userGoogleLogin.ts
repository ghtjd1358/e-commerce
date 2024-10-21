import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { googleSocialApi } from "../api";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { pageRoutes } from "@/apiRouters";
import { GoogleUser } from "../types";
import { useToastStore } from "@/store/toast/useToastStore";

export const useGoogleLoginUser = () => {
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const { setIsLogin, setUser } = useAuthStore();

  return useMutation<GoogleUser, Error>({
    mutationFn: googleSocialApi,
    onSuccess: (data) => {
      addToast("로그인성공!", "success");
      setIsLogin(true);
      setUser({
        uid: data.uid,
        email: data.email,
        displayName: data.displayName ?? "",
        photoURL: data.photoURL ?? "",
        isSeller: data.isSeller,
      });
      navigate(pageRoutes.main);
    },
    onError: (error) => {
      addToast("로그인실패!", "error");
      console.error("로그인 실패:", error);
    },
  });
};
