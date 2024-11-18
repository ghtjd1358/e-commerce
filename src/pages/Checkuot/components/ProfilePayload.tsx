import { useAuthStore } from "@/store/auth/useAuthStore";
import { Home, PhoneIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";
import { ProfileContentSkeleton } from "@/pages/common/components/auth/ProfileContentSkeleton";
import { DaumPostcode } from "./DaumPostcode";
import { useState } from "react";

export const ProfilePayload: React.FC = () => {
  const { user, isLoading } = useAuthStore();
  const [address, setAddress] = useState<string>("");
  const location = useLocation();

  const handleAddressComplete = (selectedAddress: string) => {
    setAddress(selectedAddress);
  };

  return (
    <div className="w-full">
      <Card className="bg-gray-800 border-gray-700 text-gray-300">
        <CardHeader>
          <CardTitle className="text-yellow-500 text-2xl">
            {location.pathname === "/checkout" ? "배송지 정보" : "계정 정보"}
          </CardTitle>
        </CardHeader>
        {isLoading ? (
          <ProfileContentSkeleton />
        ) : (
          <CardContent className="space-y-6 flex flex-col justify-between">
            {/* 주소 */}
            <div className="w-full flex items-center justify-between">
              <div className="h-8 flex items-center space-x-2">
                <Home />
                <span>주소 : </span>
                <span>{address ?? "집 없음"}</span>
              </div>
              {/* DaumPostcode 버튼 */}
              <DaumPostcode onComplete={handleAddressComplete} />
            </div>

            {/* 휴대번호 */}
            <div className="w-full h-8 flex items-center space-x-2">
              <PhoneIcon />
              <span>휴대번호 : </span>
              <span>{user?.phoneNumber ?? "번호 없음"}</span>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};