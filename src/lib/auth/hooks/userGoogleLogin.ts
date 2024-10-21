import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { googleSocialApi } from "../api";
import { useAuthStore } from "@/store/auth/userAuthStore";
import { pageRoutes } from "@/apiRouters";
import { GoogleUser } from "../types";

export const useGoogleLoginUser = () => {
  const navigate = useNavigate();
  const { setIsLogin, setUser } = useAuthStore();

  return useMutation<GoogleUser, Error>({
    mutationFn: googleSocialApi,
    onSuccess: (data) => {
      console.log("query data", data);
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
      console.error("로그인 실패:", error);
    },
  });
};
