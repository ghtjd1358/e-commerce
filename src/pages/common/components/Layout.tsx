import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom"; // Ensure this is imported
import { Footer } from "./Footer";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Toast } from "./Toast";
import { pageRoutes } from "../../../apiRouters";
import { NavigationBar } from "./NavigationBar";

export const authStatusType = {
  NEED_LOGIN: "NEED_LOGIN", // 로그인 필요
  NEED_NOT_LOGIN: "NEED_NOT_LOGIN", // 로그인 불필요
  IS_SELLER: "NEED_SELLER", // 판매자만 접근 가능
  IS_BUYER: "NEED_BUYER", // 구매자만 접근 가능
  COMMON: "COMMON", // 일반 접근
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 로그인 필요 권한 체크
  if (authStatus === authStatusType.NEED_LOGIN && !isLogin) {
    return <Navigate to={pageRoutes.login} />; // 로그인 페이지로 리다이렉트
  }

  // 로그인 불필요 권한 체크
  if (authStatus === authStatusType.NEED_NOT_LOGIN && isLogin) {
    return <Navigate to={pageRoutes.main} />; // 사용자가 판매자인 경우 메인 페이지로
  }

  // 판매자 권한 체크
  if (authStatus === authStatusType.IS_SELLER) {
    if (isLogin && !user?.isSeller) {
      return <Navigate to={pageRoutes.main} />; // 로그인은 했지만 판매자가 아닌 경우 메인 페이지로 리다이렉트
    }
  }

  // 구매자 권한 체크
  if (authStatus === authStatusType.IS_BUYER) {
    if (isLogin && user?.isSeller) {
      return <Navigate to={pageRoutes.productListing} />; // 로그인했지만 판매자인 경우 관리 페이지로 리다이렉트
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex flex-1">
        {" "}
        {/* main 요소가 남은 공간을 차지하도록 수정 */}
        <div className={`w-full ${containerClassName}`}>
          <Toast />
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};
