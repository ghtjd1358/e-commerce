import React from "react";
import { Button } from "@/pages/common/ui/button";
import { TableCell, TableRow } from "@/pages/common/ui/table";

export const SellerProductCardSkeleton: React.FC = () => (
  <TableRow className="animate-pulse">
    <TableCell className="text-gray-400 w-1/6 text-center">
      <div className="h-6 w-2/3 bg-gray-600 rounded mx-auto" />
    </TableCell>
    <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-normal text-center">
      <div className="h-6 w-4/5 bg-gray-600 rounded mx-auto" />
    </TableCell>
    <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
      <div className="h-6 w-2/3 bg-gray-600 rounded mx-auto" />
    </TableCell>
    <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
      <div className="h-6 w-1/2 bg-gray-600 rounded mx-auto" />
    </TableCell>
    <TableCell className="w-1/5 text-center">
      <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto" />
    </TableCell>
    <TableCell className="font-medium text-gray-400 w-1/4 overflow-hidden overflow-ellipsis whitespace-normal text-center">
      <div className="h-6 w-1/2 bg-gray-600 rounded mx-auto" />
    </TableCell>
    <TableCell className="cursor-pointer text-center">
      <div className="flex gap-2 justify-center">
        <Button className="h-10 bg-gray-600 rounded-lg" disabled />
        <Button className="h-10 bg-gray-700 rounded-lg" disabled />
      </div>
    </TableCell>
  </TableRow>
);
