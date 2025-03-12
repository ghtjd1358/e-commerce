import React from "react";
import { Card} from "@/pages/common/ui/card";

export const MypageCardSkeleton: React.FC = () => (
  <Card className="flex flex-col sm:flex-row border rounded-lg shadow-md p-5 bg-white space-y-4 sm:space-y-0 sm:space-x-4 animate-pulse">
    {/* 이미지 */}
    <div className="flex justify-center sm:w-1/4">
      <div className="w-32 h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" />
    </div>

    {/* 정보 */}
    <div className="flex flex-col flex-grow">
      {/* 제목 */}
      <div className="flex items-center space-x-2">
        <div className="h-6 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" />
      </div>

      {/* 내용 */}
      <div className="flex flex-col mb-5">
        <div className="h-6 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-6 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" />
      </div>

      {/* 상태 및 날짜 */}
      <div className="space-x-2">
        <div className="h-6 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" />
      </div>
    </div>
  </Card>
);
