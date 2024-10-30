import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { pageRoutes } from "@/apiRouters";

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
    navigate(pageRoutes.userProfile);
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
