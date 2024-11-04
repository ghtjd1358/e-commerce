import { pageRoutes } from "@/app/apiRouters";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export const LogoutButton = () => {
  const { logout } = useAuthStore();

  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location);

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
