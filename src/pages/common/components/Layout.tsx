import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Toast } from "./Toast";
import { useFilterStore } from "@/store/filter/useFilterStore";
import { ALL_CATEGORY_ID, authStatusType } from "@/shared/constants";
import { pageRoutes } from "@/app/apiRouters";
import { Header } from "./Header";
import { Footer } from "./Footer";
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
  const { isLogin, user, checkLoginStatus } = useAuthStore();
  const { setCategoryId } = useFilterStore();

  useEffect(()=>{
    checkLoginStatus()
  },[checkLoginStatus])
  
  useEffect(() => {
    setCategoryId(ALL_CATEGORY_ID);
  }, [setCategoryId]);



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (authStatus === authStatusType.NEED_LOGIN && !isLogin) {
    return <Navigate to={pageRoutes.login} />;
  }

  if (authStatus === authStatusType.NEED_NOT_LOGIN && isLogin) {
    return <Navigate to={pageRoutes.main} />;
  }

  if (authStatus === authStatusType.IS_SELLER && !isLogin && !user?.isSeller) {
    return <Navigate to={pageRoutes.main} />;
  }

  if (authStatus === authStatusType.IS_BUYER && isLogin && user?.isSeller) {
    return <Navigate to={pageRoutes.sellerdashboard} />;
  }

  const showHeaderFooter = authStatus !== authStatusType.NEED_NOT_LOGIN;

  return (
    <div className="min-h-screen">
      {showHeaderFooter && <Header />}
      <main className="">
        <div className={`w-full ${containerClassName}`}>
          <Toast />
          {children}
        </div>
      </main>
      <Footer/>
    </div>
  );
};
