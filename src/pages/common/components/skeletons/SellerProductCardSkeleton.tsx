import React from "react";

export const SellerProductCardSkeleton: React.FC = () => (
  <div className="flex flex-col sm:flex-row border rounded-lg shadow-md p-5 bg-white space-y-4 sm:space-y-0 sm:space-x-4 animate-pulse">
    {/* 이미지 스켈레톤 */}
    <div className="flex justify-center sm:w-1/4">
      <div className="w-32 h-32 bg-gray-200 rounded-lg" />
    </div>

    {/* 상품 정보 스켈레톤 */}
    <div className="flex flex-col flex-grow">
      {/* 상품명 스켈레톤 */}
      <div className="flex items-center space-x-2">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
      </div>

      {/* 가격 및 수량 스켈레톤 */}
      <div className="flex flex-col mb-5 mt-2">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-6 bg-gray-200 rounded w-1/3" />
      </div>

      {/* 날짜 스켈레톤 */}
      <div className="space-x-2">
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>

    {/* 수정/삭제 버튼 스켈레톤 */}
    <div className="flex flex-col justify-evenly items-end sm:w-auto p-2">
      <div className="h-10 bg-gray-200 rounded w-20 mb-2" />
      <div className="h-10 bg-gray-200 rounded w-20" />
    </div>
  </div>
);
