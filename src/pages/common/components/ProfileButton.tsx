import React from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { pageRoutes } from "@/app/apiRouters";

interface User {
  uid: string;
  photoURL?: string | null;
  nickname?: string;
  isSeller?: boolean;
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
    if (user) {
      navigate(pageRoutes.buyerdashboard);
    }
  };

  return (
    <button
      className="mx-3 font-bold tracking-widest text-black bg-inherit hover:opacity-50"
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
    </button>
  );
};
