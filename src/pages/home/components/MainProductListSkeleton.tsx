import React from "react";
import { Card, CardContent } from "@/pages/common/ui/card";
import { Button } from "@/pages/common/ui/button";

export const ProductCardSkeleton: React.FC = () => (
  <Card className="border-gray-700 gap-y-6 min-h-[500px] animate-pulse">
    <CardContent className="p-4">
      <div className="relative w-full h-[250px] bg-gray-300 rounded-lg mb-4" />
      <div className="h-6 w-4/4 bg-gray-200 rounded mb-2"></div>

      <div className="flex justify-between items-center mb-12 mt-4">
        <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button className="flex-1 h-10 bg-gray-200 rounded-lg" disabled />
        <Button className="flex-1 h-10 bg-gray-300 rounded-lg" disabled />
      </div>
    </CardContent>
  </Card>
);
