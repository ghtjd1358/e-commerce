import React from "react";
import { TableCell, TableRow } from "@/pages/common/ui/table";

export const OrderProductCardSkeleton: React.FC = () => (
  <TableRow className="animate-pulse">
    {[...Array(6)].map((_, index) => (
      <TableCell key={index} className="text-center">
        {index === 1 ? (
          <div className="w-full h-[50px] bg-gradient-to-r from-gray-white via-gray-white rounded-lg mx-auto" />
        ) : (
          <div className="h-[20px] w-[80%] bg-gradient-to-r from-gray-white via-gray-white rounded mx-auto" />
        )}
      </TableCell>
    ))}
  </TableRow>
);
