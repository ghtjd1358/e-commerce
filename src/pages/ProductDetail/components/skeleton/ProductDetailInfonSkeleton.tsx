import React from "react";

export const ProductDetailInfoSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        {/* 메인 이미지 */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse w-full h-full rounded" />
        </div>
        {/* 썸네일 이미지 */}
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse w-full h-full rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* 제목 */}
        <div className="animate-pulse h-8 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded" />
        {/* 별점 */}
        <div className="flex items-center space-x-2 ">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div
                key={index}
                className="animate-pulse w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"
              />
            ))}
          </div>
          <div className="animate-pulse h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded" />
        </div>
        {/* 가격 */}
        <div className="animate-pulse h-8 w-1/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded" />
        {/* 설명 */}
        <div className="animate-pulse h-20 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded" />

        {/* 버튼 섹션 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-[20px]">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse w-[80px] h-[40px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-white rounded"
              />
            ))}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex space-x-[20px]">
          {[...Array(2)].map((_, index) => (
            <button
              key={index}
              disabled
              className="flex-grow bg-gradient-to-r from-gray-white via-gray-white animate-pulse text-white py-[15px] px-[10px] rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
