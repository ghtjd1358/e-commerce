import React from "react";
import { Card, CardContent } from "@/pages/common/ui/card";

export const OrderProductCardSkeleton: React.FC = () => (
  <Card className="animate-pulse mb-4 bg-gray-800 border-gray-700">
    <CardContent className="flex justify-between items-center p-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex-1 px-2">
          {index === 1 ? (
            <div className="w-full h-[50px] bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg mx-auto" />
          ) : (
            <div className="h-[20px] w-[80%] bg-gradient-to-r from-gray-700 to-gray-600 rounded mx-auto" />
          )}
        </div>
      ))}
    </CardContent>
  </Card>
);
