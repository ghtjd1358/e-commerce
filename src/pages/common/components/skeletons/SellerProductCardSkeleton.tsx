import React from "react";
import { TableCell, TableRow } from "@/pages/common/ui/table";

export const SellerProductCardSkeleton: React.FC = () => (
  <TableRow className="animate-pulse">
    <TableCell className="text-gray-400 w-1/6 text-center">
      <div className="h-6 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mx-auto" />
    </TableCell>
    <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-normal text-center">
      <div className="h-6 w-4/5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mx-auto" />
    </TableCell>
    <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
      <div className="h-6 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mx-auto" />
    </TableCell>
    <TableCell className="text-gray-400 w-1/6 overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
      <div className="h-6 w-1/2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mx-auto" />
    </TableCell>
    <TableCell className="text-gray-400 w-1/6 overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-lg mx-auto" />
    </TableCell>
    <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-normal text-center">
      <div className="h-6 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mx-auto" />
    </TableCell>
  </TableRow>
);
