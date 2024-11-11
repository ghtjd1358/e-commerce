import React from "react";
import { TableCell, TableRow } from "@/pages/common/ui/table";

export const OrderProductCardSkeleton: React.FC = () => (
  <TableRow className="animate-pulse">
    <TableCell className="text-gray-400 w-1/6 text-center">
      <div className="h-6 w-full bg-gray-600 rounded mx-auto" />
    </TableCell>
    <TableCell className="w-1/5 text-center">
      <div className="w-full h-16 bg-gray-700 rounded-lg mx-auto" />
    </TableCell>
    <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-normal text-center">
      <div className="h-6 w-full bg-gray-600 rounded mx-auto" />
    </TableCell>
    <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
      <div className="h-6 w-full bg-gray-600 rounded mx-auto" />
    </TableCell>
    <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
      <div className="h-6 w-full bg-gray-600 rounded mx-auto" />
    </TableCell>
    <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
      <div className="h-6 w-full bg-gray-600 rounded mx-auto" />
    </TableCell>
  </TableRow>
);
