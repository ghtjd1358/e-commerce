import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export const SummaryTable: React.FC = ({ totalPrice, totalCount }) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-gold">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>$720.00</span>
        </div>
        <div className="flex justify-between font-bold text-gold">
          <span>Total</span>
          <span>${(totalPrice + 720).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Items</span>
          <span>{totalCount}</span>
        </div>
      </CardContent>
    </Card>
  );
};
