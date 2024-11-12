import React from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { pageRoutes } from "@/app/apiRouters";
import { Button } from "../ui/button";

interface User {
  uid: string;
  photoURL?: string | null;
  nickname?: string;
}

interface ProfileButtonProps {
  user: User | null | undefined;
  isLogin: boolean;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({
  user,
  isLogin,
}) => {
  const navigate = useNavigate();
  const handleClickProfile = () => {
    navigate(pageRoutes.buyerdashboard);
  };

  return (
    <Button
      className="text-yellow-400 font-semibold tracking-widest"
      variant="ghost"
      onClick={handleClickProfile}
    >
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
