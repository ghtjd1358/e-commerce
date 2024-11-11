import { CreditCard, Home, PhoneIcon, User, UserCircle } from "lucide-react";
import { Button } from "@/pages/common/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";
import { useLocation } from "react-router-dom";

export const ProfileSkeleton: React.FC = () => {
  const location = useLocation();

  return (
    <Card className="bg-gray-800 border-gray-700 text-gray-300 animate-pulse mb-8">
      <CardHeader>
        <CardTitle className="text-yellow-500 text-2xl">
          {location.pathname === "/checkout" ? "구매자 정보" : "계정 정보"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-[50%] h-6 flex items-center space-x-2">
          <User />
          <span>이름 : </span>
          <div className=" h-6 w-2/3 bg-gray-600 rounded mx-auto" />
        </div>

        <div className="w-[50%] h-6 flex items-center space-x-2">
          <CreditCard />
          <span>이메일 : </span>
          <div className="w-2/3 h-6  bg-gray-600 rounded mx-auto" />
        </div>

        <div className="w-[50%] h-6 flex items-center space-x-2">
          <UserCircle />
          <span>닉네임 : </span>
          <div className="w-2/3 h-6  bg-gray-600 rounded mx-auto" />
        </div>

        <div className="w-[50%] h-6 flex items-center space-x-2">
          <Home />
          <span>주소지 : </span>
          <div className="w-2/3 h-6  bg-gray-600 rounded mx-auto" />
        </div>

        <div className="w-[50%] h-6 flex items-center space-x-2">
          <PhoneIcon />
          <span>전화번호 : </span>
          <div className="w-2/3 h-6  bg-gray-500 rounded mx-auto" />
        </div>

        <Button className="w-full h-10 bg-gray-500 items-end"></Button>
      </CardContent>
    </Card>
  );
};
