import { pageRoutes } from "@/apiRouters";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IUser, RegisterUserReqDTO } from "../types";
import { registerUserAPI } from "../api";

export const useRegisterUser = () => {
  const navigate = useNavigate();

  return useMutation<IUser, Error, RegisterUserReqDTO>({
    mutationFn: registerUserAPI,
    onSuccess: () => {
      navigate(pageRoutes.login);
    },
    onError: (error: Error) => {
      console.error("회원가입 오류 발생", error.message);
    },
  });
};
