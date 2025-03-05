import React from "react";
import { Card, CardContent } from "@/pages/common/ui/card";
import { Button } from "@/pages/common/ui/button";

export const ProductCardSkeleton: React.FC = () => (
  <Card className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 shadow-md rounded-lg gap-y-6 min-h-[500px] animate-pulse">
    <CardContent className="p-4">
      {/* 메인 이미지 */}
      <div className="relative w-full h-[250px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-4" />
      
      {/* 제목 */}
      <div className="h-6 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2"></div>

      {/* 가격 및 기타 정보 */}
      <div className="flex justify-between items-center mb-12 mt-4">
        <div className="h-6 w-1/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"></div>
        <div className="h-6 w-1/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"></div>
      </div>

      {/* 버튼 섹션 */}
      <div className="flex gap-2 mt-4">
        <Button disabled className="flex-1 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-white rounded-lg" />
        <Button disabled className="flex-1 h-10 bg-gradient-to-r from-gray-white via-gray-white to-gray-white rounded-lg" />
      </div>
    </CardContent>
  </Card>
);
