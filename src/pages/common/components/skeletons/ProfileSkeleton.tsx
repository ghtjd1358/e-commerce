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
    <Card className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-white border border-gray-300 text-gray-black animate-pulse mb-[20px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-black">
          {location.pathname === "/checkout" ? "구매자 정보" : "계정 정보"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-[20px]">
        {[User, CreditCard, UserCircle, Home, PhoneIcon].map((Icon, index) => (
          <div key={index} className="flex items-center space-x-[10px]">
            <Icon className="w-[20px] h-[20px] text-gray-black" />
            <span>정보 :</span>
            <div className="h-[20px] w-[50%] bg-gradient-to-r from-gray-white via-gray-white rounded mx-auto" />
          </div>
        ))}
        <Button disabled className="w-full h-[40px] bg-gradient-to-r from-gray-white via-gray-white rounded"></Button>
      </CardContent>
    </Card>
  );
};
