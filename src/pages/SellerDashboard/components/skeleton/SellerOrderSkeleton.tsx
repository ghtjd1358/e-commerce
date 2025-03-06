import React from "react";
import { SellerProductCardSkeleton } from "@/pages/common/components/skeletons/SellerProductCardSkeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";
import { ProfileSkeleton } from "@/pages/common/components/skeletons/ProfileSkeleton";

export const SellerOrderSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      <ProfileSkeleton />
      <Card className="bg-gray-100 border-gray-200">
        <CardHeader>
          <div className="flex justify-between mb-4">
            <CardTitle className="text-gray-700 mb-5">주문 목록</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <SellerProductCardSkeleton key={index} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
