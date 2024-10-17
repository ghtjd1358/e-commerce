import { pageRoutes } from "@/apiRouters";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

export const LoginButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const clickHandlerLogin = () => {
    navigate(pageRoutes.login);
  };

  return (
    <Button className="bg-gray-800 w-24" onClick={clickHandlerLogin}>
      로그인
    </Button>
  );
};
