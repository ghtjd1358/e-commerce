// import { useRef, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { ReactNode, useEffect } from "react";
import { Toast } from "./Toast";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLogin, user, checkLoginStatus } = useAuthStore();

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return (
    <>
      <div className="w-full">
        <main>
          <Header isLogin={isLogin} user={user} />
          <Toast />
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
};
