import { CreditCard, Home, PhoneIcon, User, UserCircle } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";
import { CardContent } from "../../ui/card";

export const ProfileContentSkeleton: React.FC = () => {
  return (
    <CardContent className="space-y-6">
      <div className="w-[50%] h-6 flex items-center space-x-2">
        <User />
        <span>이름 : </span>
        <div className="h-6 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mx-auto animate-pulse" />
      </div>

      <div className="w-[50%] h-6 flex items-center space-x-2">
        <CreditCard />
        <span>이메일 : </span>
        <div className="h-6 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mx-auto animate-pulse" />
      </div>

      <div className="w-[50%] h-6 flex items-center space-x-2">
        <UserCircle />
        <span>닉네임 : </span>
        <div className="h-6 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mx-auto animate-pulse" />
      </div>

      <div className="w-[50%] h-6 flex items-center space-x-2">
        <Home />
        <span>주소지 : </span>
        <div className="h-6 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mx-auto animate-pulse" />
      </div>

      <div className="w-[50%] h-6 flex items-center space-x-2">
        <PhoneIcon />
        <span>전화번호 : </span>
        <div className="h-6 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mx-auto animate-pulse" />
      </div>

      <Button
        disabled
        className="w-full h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-white rounded-lg animate-pulse"
      />
    </CardContent>
  );
};
