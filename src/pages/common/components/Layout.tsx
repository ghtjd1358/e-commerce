// import { useRef, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useAuthStore } from "@/store/auth/userAuthStore";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { isLogin, user, checkLoginStatus } = useAuthStore();
  console.log("boolean", isLogin);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return (
    <>
      <div className="w-full">
        <main>
          <Header isLogin={isLogin} user={user} />
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
}
