import { pageRoutes } from "@/app/apiRouters";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
  const { logout } = useAuthStore();

  const navigate = useNavigate();

  const clickHandlerLogout = () => {
    logout();
    navigate(pageRoutes.main);
  };

  return (

<Button
  className="w-24 px-4 py-2 flex items-center justify-center space-x-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-md hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all duration-300"
  onClick={clickHandlerLogout}
>
  <LogOut className="w-4 h-4" />
  <span>로그아웃</span>
</Button>

  );
};
