import { pageRoutes } from "@/apiRouters";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useToastStore } from "@/store/toast/useToastStore";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const PrivateRoute = ({ element }) => {
  const { isLogin } = useAuthStore();
  return isLogin ? element : <Navigate to={pageRoutes.login} />;
};

export const PublicRoute = ({ element }) => {
  const { isLogin } = useAuthStore();
  return !isLogin ? element : <Navigate to={pageRoutes.main} />;
};

export const SellerRoute = ({ element }) => {
  const { isSeller, isLogin } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSeller && !isLogin) {
      addToast("로그인 부탁드립니다!", "error");
      navigate(pageRoutes.login);
    } else if (!isSeller) {
      addToast("판매 권한이 없습니다.", "error");
      navigate(-1);
    }
  }, [isSeller, navigate, isLogin, addToast]);

  return isSeller && isLogin && element;
};
