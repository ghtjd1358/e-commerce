import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { CreditCard, User } from "lucide-react";
import React from "react";

export const Profile: React.FC = () => {
  const { user } = useAuthStore();
  return (
    <div className="w-full">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500">계정 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <User className="text-gray-400" />
            <span className="text-gray-400">{user?.displayName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CreditCard className="text-gray-400" />
            <span className="text-gray-400">{user?.email}</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <Button className=" bg-gray-500 items-end">
              개인정보 수정 및 배송지 주소 입력
            </Button>
            <Button className="font-bold" variant="outline">
              개인정보 수정
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
