import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";
import { ProfileSkeleton } from "@/pages/common/components/skeletons/ProfileSkeleton";
import { OrderProductCardSkeleton } from "@/pages/common/components/skeletons/OrderProductCardSkeleton";

export const BuyerOrderSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      <ProfileSkeleton />
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex justify-between mb-4">
            <CardTitle className="text-yellow-500 mb-5">구매 목록</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <OrderProductCardSkeleton />
        </CardContent>
      </Card>
    </div>
  );
};
