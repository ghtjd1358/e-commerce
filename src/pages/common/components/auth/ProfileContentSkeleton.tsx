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
        <div className="h-6 w-2/3 bg-gray-600 rounded mx-auto" />
      </div>

      <div className="w-[50%] h-6 flex items-center space-x-2">
        <CreditCard />
        <span>이메일 : </span>
        <div className="h-6 w-2/3 bg-gray-600 rounded mx-auto" />
      </div>

      <div className="w-[50%] h-6 flex items-center space-x-2">
        <UserCircle />
        <span>닉네임 : </span>
        <div className="h-6 w-2/3 bg-gray-600 rounded mx-auto" />
      </div>

      <div className="w-[50%] h-6 flex items-center space-x-2">
        <Home />
        <span>주소지 : </span>
        <div className="h-6 w-2/3 bg-gray-600 rounded mx-auto" />
      </div>

      <div className="w-[50%] h-6 flex items-center space-x-2">
        <PhoneIcon />
        <span>전화번호 : </span>
        <div className="h-6 w-2/3 bg-gray-600 rounded mx-auto" />
      </div>

      <Button className="w-full h-10 bg-gray-500 items-end"></Button>
    </CardContent>
  );
};
