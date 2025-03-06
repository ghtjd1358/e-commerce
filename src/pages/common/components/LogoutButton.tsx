import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useScrollThreshold } from "@/shared/hooks/useScroll"; 

export const LogoutButton = () => {
  const { logout } = useAuthStore();
  const isScrolled = useScrollThreshold(60);
  const navigate = useNavigate();

  const clickHandlerLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <Button
      className={`w-24 px-4 py-2 flex items-center justify-center space-x-2 text-sm font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isScrolled
          ? "text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 focus:ring-red-400"
          : "text-gray-700 bg-gray-50 hover:bg-gray-300 focus:ring-gray-400"
      }`}
      onClick={clickHandlerLogout}
    >
      <LogOut className="w-4 h-4" />
      <span>로그아웃</span>
    </Button>
  );
};
