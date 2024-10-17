import React from "react";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../apiRouters";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const handleClickBackButton = () => {
    navigate(pageRoutes.main, { replace: true });
  };

  return (
    <div>
      <p>페이지를 찾을 수 없습니다.</p>
      <button onClick={handleClickBackButton}>뒤로이동</button>
    </div>
  );
};
