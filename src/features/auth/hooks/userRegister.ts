import { pageRoutes } from "@/app/apiRouters";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IUser, RegisterUserReqDTO } from "../types";
import { registerUserAPI } from "../api";
import { useToastStore } from "@/store/toast/useToastStore";

export const useRegisterUser = () => {
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  return useMutation<IUser, Error, RegisterUserReqDTO>({
    mutationFn: registerUserAPI,
    onSuccess: () => {
      addToast("회원가입 성공!", "success");
      navigate(pageRoutes.login);
    },
    onError: (error: Error) => {
      console.error("회원가입 오류 발생", error.message);
    },
  });
};
