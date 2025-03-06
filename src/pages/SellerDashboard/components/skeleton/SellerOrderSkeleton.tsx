import React from "react";
import { SellerProductCardSkeleton } from "@/pages/common/components/skeletons/SellerProductCardSkeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/pages/common/ui/table";
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
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-600 sticky top-0 bg-gray-100 z-10 text-center">
                  제품
                </TableHead>
                <TableHead className="text-gray-600 sticky top-0 bg-gray-100 z-10 text-center">
                  이미지
                </TableHead>
                <TableHead className="text-gray-600 sticky top-0 bg-gray-100 z-10 text-center">
                  수량
                </TableHead>
                <TableHead className="text-gray-600 sticky top-0 bg-gray-100 z-10 text-center">
                  판매자
                </TableHead>
                <TableHead className="text-gray-600 sticky top-0 bg-gray-100 z-10 text-center">
                  상태
                </TableHead>
                <TableHead className="text-gray-600 sticky top-0 bg-gray-100 z-10 w-1/2 text-center">
                  날짜
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <SellerProductCardSkeleton />
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
