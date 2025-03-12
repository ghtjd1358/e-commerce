import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";
import { ProfileSkeleton } from "@/pages/common/components/skeletons/ProfileSkeleton";
import { MypageCardSkeleton } from "@/pages/common/components/skeletons/MypageCardSkeleton";

export const MypageSkeleton: React.FC = () => {
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
          <MypageCardSkeleton />
        </CardContent>
      </Card>
    </div>
  );
};
