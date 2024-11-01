import { pageRoutes } from "@/apiRouters";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSellerUser } from "@/lib/auth/hooks/useSellerAuth";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { CreditCard, User } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const { mutate: seller } = useSellerUser();
  const location = useLocation();
  const navigate = useNavigate();

  const handlerProfileMove = () => {
    navigate(pageRoutes.profileSettings);
  };

  const handlerSellerRegister = () => {
    seller();
  };

  return (
    <div className="w-full">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 text-2xl">
            {location.pathname === "/purchase" ? "구매자 정보" : "계정 정보"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex w-full h-4 justify-between">
            <div className="flex gap-2">
              <User className="text-gray-400" />
              <span className="text-gray-400">{user?.displayName}</span>
            </div>
            {user?.isSeller === false && (
              <Button onClick={handlerSellerRegister}>판매자 등록</Button>
            )}
          </div>
          <div className="w-full h-8 flex items-center space-x-2">
            <CreditCard className="text-gray-400" />
            <span className="text-gray-400">{user?.email}</span>
          </div>
          <Button
            onClick={handlerProfileMove}
            className="w-full h-10 bg-gray-500 items-end"
          >
            개인정보 수정 및 배송지 주소 입력
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
