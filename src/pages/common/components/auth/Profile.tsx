import { pageRoutes } from "@/app/apiRouters";
import { useSellerUser } from "@/features/auth/hooks/useSellerAuth";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { CreditCard, Home, PhoneIcon, User, UserCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { ProfileContentSkeleton } from "@/pages/common/components/auth/ProfileContentSkeleton";
import { useFetchAccount } from "@/features/account/hooks/useFetchAccount";


export const Profile: React.FC = () => {
  const { user, isLoading } = useAuthStore();
  console.log('user', user)
  const { data } = useFetchAccount(user?.uid ?? "");
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
        {isLoading ? (
          <ProfileContentSkeleton />
        ) : (
          <CardContent className="space-y-6">
            <div className="flex w-full h-4 justify-between">
              <div className="flex gap-2">
                <User />
                <span>이름 : </span>
                <span>{data?.displayName}</span>
              </div>
              {data?.isSeller === false && (
                <Button onClick={handlerSellerRegister}>판매자 등록</Button>
              )}
            </div>
            <div className="w-full h-8 flex items-center space-x-2">
              <CreditCard />
              <span>이메일 : </span>
              <span>{data?.email}</span>
            </div>

            <div className="flex items-center space-x-2">
              <UserCircle />
              <span>닉네임 : </span>
              <span>{data?.nickname || "등록되지 않음"}</span>
            </div>
            {data?.address && (
              <div className="flex items-center space-x-2">
                <Home />
                <span>주소지 : </span>
                <span>
                  {data?.address}, {data?.detailAddress}
                </span>
              </div>
            )}
            {data?.phoneNumber && (
              <div className="flex items-center space-x-2">
                <PhoneIcon />
                <span>전화번호 : </span>
                <span>{data?.phoneNumber}</span>
              </div>
            )}
            <Button
              onClick={handlerProfileMove}
              className="w-full h-10 bg-gray-500 items-end"
            >
              개인정보 수정
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
