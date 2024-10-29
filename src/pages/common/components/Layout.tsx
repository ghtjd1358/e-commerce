import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Footer } from "./Footer";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Toast } from "./Toast";
import { pageRoutes } from "../../../apiRouters";
import { NavigationBar } from "./NavigationBar";
import { useFilterStore } from "@/store/filter/useFilterStore";
import { ALL_CATEGORY_ID } from "@/constants";

export const authStatusType = {
  NEED_LOGIN: "NEED_LOGIN",
  NEED_NOT_LOGIN: "NEED_NOT_LOGIN",
  IS_SELLER: "IS_SELLER",
  IS_BUYER: "IS_BUYER",
  COMMON: "COMMON",
};

interface LayoutProps {
  children: ReactNode;
  containerClassName?: string;
  authStatus?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  containerClassName = "",
  authStatus = authStatusType.COMMON,
}) => {
  const { isLogin, user, isLoading } = useAuthStore();
  const { setCategoryId } = useFilterStore();

  useEffect(() => {
    setCategoryId(ALL_CATEGORY_ID);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (authStatus === authStatusType.NEED_LOGIN && !isLogin) {
    return <Navigate to={pageRoutes.login} />;
  }

  if (authStatus === authStatusType.NEED_NOT_LOGIN && isLogin) {
    return <Navigate to={pageRoutes.main} />;
  }

  if (
    authStatus === authStatusType.IS_SELLER &&
    (!isLogin || !user?.isSeller)
  ) {
    return <Navigate to={pageRoutes.main} />;
  }

  if (authStatus === authStatusType.IS_BUYER && isLogin && user?.isSeller) {
    return <Navigate to={pageRoutes.productListing} />;
  }

  // 로그인이나 회원가입 페이지일 경우 Header와 Footer 숨기기
  const showHeaderFooter = authStatus !== authStatusType.NEED_NOT_LOGIN;

  return (
    <div className="min-h-screen flex flex-col">
      {showHeaderFooter && <NavigationBar />}
      <main className="flex flex-1">
        <div className={`w-full ${containerClassName}`}>
          <Toast />
          {children}
        </div>
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
};
