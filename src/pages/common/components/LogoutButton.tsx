import { pageRoutes } from "@/apiRouters";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useLocation, useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { logout } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const clickHandlerLogout = () => {
    logout();
    navigate(pageRoutes.main);
  };

  return (
    <Button
      className="bg-gray-700 w-24 text-gray-300"
      onClick={clickHandlerLogout}
    >
      로그아웃
    </Button>
  );
};
