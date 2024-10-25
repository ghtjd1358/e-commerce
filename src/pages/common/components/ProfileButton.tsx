import { pageRoutes } from "@/apiRouters";
import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const ProfileButton: React.FC = () => {
  const navigate = useNavigate();
  const { isLogin, user } = useAuthStore();

  const handleClickProfile = () => {
    navigate(pageRoutes.userProfile);
  };

  return (
    <Button variant="ghost" onClick={handleClickProfile}>
      {isLogin && user ? (
        <>
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={`${user.photoURL}'s profile`}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            user.nickname
          )}
        </>
      ) : (
        <CircleUserRound className="w-5 h-5" />
      )}
    </Button>
  );
};
