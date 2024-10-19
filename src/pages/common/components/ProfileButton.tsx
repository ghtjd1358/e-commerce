import { pageRoutes } from "@/apiRouters";
import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

interface profileButtonProps {
  user: { nickname: string; photoURL?: string } | null; // photoURL을 선택적으로 추가
  isLogin: boolean;
}

export const ProfileButton: React.FC<profileButtonProps> = ({
  user,
  isLogin,
}) => {
  const navigate = useNavigate();
  const handleClickProfile = () => {
    navigate(pageRoutes.userProfile);
  };

  return (
    <Button variant="ghost" onClick={handleClickProfile}>
      {isLogin && user ? (
        <>
          {user.photoURL ? ( // photoURL이 존재할 경우 이미지로 표시
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
