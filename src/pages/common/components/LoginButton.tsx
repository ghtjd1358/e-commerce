import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react"; // 로그인 아이콘
import { useScrollThreshold } from "@/shared/hooks/useScroll"; // 커스텀 훅 import
import { pageRoutes } from "@/app/apiRouters";

export const LoginButton = () => {
  const navigate = useNavigate();
  const isScrolled = useScrollThreshold(60); // 스크롤 상태 확인

  const clickHandlerLogin = () => {
    navigate(pageRoutes.login); // 로그인 페이지로 이동
  };

  return (
    <Button
      className={`w-24 px-4 py-2 flex items-center justify-center space-x-2 text-sm font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isScrolled
          ? "text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-blue-400"
          : "text-gray-700 bg-gray-50 hover:bg-gray-300 focus:ring-gray-400"
      }`}
      onClick={clickHandlerLogin}
    >
      <LogIn className="w-4 h-4" />
      <span>로그인</span>
    </Button>
  );
};
