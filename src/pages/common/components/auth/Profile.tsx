import { pageRoutes } from "@/app/apiRouters";
import { useSellerUser } from "@/features/auth/hooks/useSellerAuth";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { CreditCard, Home, PhoneIcon, User, UserCircle } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const { mutate: seller } = useSellerUser();
  const location = useLocation();
  const navigate = useNavigate();

  const handlerProfileMove = () => {
    navigate(pageRoutes.profileEdit);
  };

  const handlerSellerRegister = () => {
    seller();
  };

  return (
    <div className="w-full">
      <Card className="bg-gray-800 border-gray-700 text-gray-300">
        <CardHeader>
          <CardTitle className="text-yellow-500 text-2xl">
            {location.pathname === "/checkout" ? "구매자 정보" : "계정 정보"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex w-full h-4 justify-between">
            <div className="flex gap-2">
              <User />
              <span>이름 : </span>
              <span>{user?.displayName}</span>
            </div>
            {user?.isSeller === false && (
              <Button onClick={handlerSellerRegister}>판매자 등록</Button>
            )}
          </div>
          <div className="w-full h-8 flex items-center space-x-2">
            <CreditCard />
            <span>이메일 : </span>
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center space-x-2">
            <UserCircle />
            <span>닉네임 : </span>
            <span>{user?.nickname || "등록되지 않음"}</span>
          </div>
          {user?.address && (
            <div className="flex items-center space-x-2">
              <Home />
              <span>주소지 : </span>
              <span>{user?.address}</span>
            </div>
          )}
          {user?.phoneNumber && (
            <div className="flex items-center space-x-2">
              <PhoneIcon />
              <span>전화번호 : </span>
              <span>{user?.phoneNumber}</span>
            </div>
          )}

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
