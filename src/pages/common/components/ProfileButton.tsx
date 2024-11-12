import React from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { pageRoutes } from "@/app/apiRouters";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import {
  getOrdersForBuyerApi,
  getOrdersForSellerApi,
} from "@/features/order/api";
import { getAccountApi } from "@/features/account/api";

interface User {
  uid: string;
  photoURL?: string | null;
  nickname?: string;
  isSeller: boolean;
}

interface ProfileButtonProps {
  user: User | null | undefined;
  isLogin: boolean;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({
  user,
  isLogin,
}) => {
  const navigate = useNavigate();
  const handleClickProfile = () => {
    navigate(pageRoutes.buyerdashboard);
  };
  const queryClient = useQueryClient();

  // prefetch
  const handlePrefetchUserAndOrders = async (user: User) => {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["user", { uid: user.uid }],
        queryFn: async () => await getAccountApi(user.uid),
      }),
      queryClient.prefetchQuery({
        queryKey: [
          "orders",
          user.isSeller ? { sellerId: user.uid } : { buyerId: user.uid },
        ],
        queryFn: async () =>
          user.isSeller
            ? await getOrdersForSellerApi(user.uid)
            : await getOrdersForBuyerApi(user.uid),
      }),
    ]);
  };

  return (
    <Button
      className="text-yellow-400 font-semibold tracking-widest"
      variant="ghost"
      onClick={handleClickProfile}
      onMouseEnter={() => user && handlePrefetchUserAndOrders(user)}
    >
      {isLogin && user ? (
        <>
          {user.photoURL ? (
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
