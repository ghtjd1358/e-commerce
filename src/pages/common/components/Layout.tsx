import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Toast } from "./Toast";
import { useFilterStore } from "@/store/filter/useFilterStore";
import { ALL_CATEGORY_ID, authStatusType } from "@/shared/constants";
import { pageRoutes } from "@/app/apiRouters";
import { NavigationBar } from "./NavigationBar";
import { Footer } from "./Footer";
import { onCLS, onINP, onFCP, onLCP, onTTFB } from "web-vitals";

// 측정된 메트릭을 처리하는 함수
const reportWebVitals = (onPerfEntry?: (metric) => void) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    // 각 메트릭을 호출하고 콘솔에 출력
    onCLS((metric) => {
      onPerfEntry(metric);
    });
    onINP((metric) => {
      onPerfEntry(metric);
    });
    onFCP((metric) => {
      onPerfEntry(metric);
    });
    onLCP((metric) => {
      onPerfEntry(metric);
    });
    onTTFB((metric) => {
      onPerfEntry(metric);
    });
  }
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
  const { isLogin, user } = useAuthStore();
  const { setCategoryId } = useFilterStore();

  useEffect(() => {
    setCategoryId(ALL_CATEGORY_ID);
  }, [setCategoryId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    reportWebVitals((metric) => {
      console.log("Web Vitals Metric:", metric);
    });
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
      {showHeaderFooter && <NavigationBar />}
      <main className="flex">
        <div className={`w-full ${containerClassName}`}>
          <Toast />
          {children}
        </div>
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
};
