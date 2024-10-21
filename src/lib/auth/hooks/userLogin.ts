import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../api";
import { useAuthStore } from "@/store/auth/userAuthStore";
import { pageRoutes } from "@/apiRouters";
import { useNavigate } from "react-router-dom";
import { LoginRequestDto, LoginResponseDto } from "../types";

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { setIsLogin, setUser } = useAuthStore();

  return useMutation<LoginResponseDto, Error, LoginRequestDto>({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      setIsLogin(true);
      setUser({
        uid: data.uid,
        email: data.email,
        nickname: data.nickname ?? "",
        displayName: data.displayName ?? "",
        photoURL: data.photoURL ?? null,
        isSeller: data.isSeller,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
      navigate(pageRoutes.main);
    },
    onError: (error) => {
      alert(error.message);
      console.error("로그인 중 오류가 발생하였습니다.", error);
    },
  });
};
