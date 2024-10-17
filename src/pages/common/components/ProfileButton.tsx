import { pageRoutes } from "@/apiRouters";
import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

export const ProfileButton: React.FC = () => {
  const navigate = useNavigate();
  const handleClickProfile = () => {
    navigate(pageRoutes.userProfile);
  };

  return (
    <Button variant="ghost" onClick={handleClickProfile}>
      <CircleUserRound className="w-5 h-5" />
    </Button>
  );
};
