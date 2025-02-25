import { pageRoutes } from "@/app/apiRouters";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export const LoginButton = () => {
  const navigate = useNavigate();
  

  const clickHandlerLogin = () => {
    navigate(pageRoutes.login);
  };

  return (
    <Button className="bg-gray-700 w-24" onClick={clickHandlerLogin}>
      로그인
    </Button>
  );
};
