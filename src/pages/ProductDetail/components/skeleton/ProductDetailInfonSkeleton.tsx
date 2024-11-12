import React from "react";

export const ProductDetailInfoSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
          <div className="bg-gray-600 animate-pulse w-full h-full rounded" />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-600 rounded-lg overflow-hidden"
            >
              <div className="bg-gray-600 animate-pulse w-full h-full rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="animate-pulse h-8 w-3/4 bg-gray-600 rounded" />
        <div className="flex items-center space-x-2 ">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div
                key={index}
                className="animate-pulse w-5 h-5 bg-gray-600 rounded-full "
              />
            ))}
          </div>
          <div className="animate-pulse h-4 w-24 bg-gray-600 rounded" />
        </div>
        <div className="animate-pulse h-8 w-1/4 bg-gray-600 rounded" />
        <div className="animate-pulse h-20 w-3/4 bg-gray-600 rounded" />

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-4">
              <div className="animate-pulse w-8 h-8 bg-gray-600 rounded" />
              <div className="animate-pulse w-16 h-8 bg-gray-600 rounded" />
              <div className="animate-pulse w-8 h-8 bg-gray-600 rounded" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-between gap-5">
              <div className="animate-pulse w-56 h-12 bg-gray-600 rounded" />
              <div className="animate-pulse w-56 h-12 bg-gray-600 rounded" />
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 bg-gray-600 hover:bg-gold/90 text-white">
            <div className="bg-gray-300 animate-pulse w-full h-full rounded" />
          </div>
          <div className="flex-1 bg-gray-700 hover:bg-gold/90 text-white">
            <div className="bg-gray-300 animate-pulse w-full h-full rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
