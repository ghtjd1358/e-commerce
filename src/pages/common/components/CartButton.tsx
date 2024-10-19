import { pageRoutes } from "@/apiRouters";
import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export const CartButton: React.FC = () => {
  const navigate = useNavigate();
  //   const cartItemCount = cart.length;

  const handleClickCart = () => {
    navigate(pageRoutes.cart);
  };

  return (
    <Button variant="ghost" onClick={handleClickCart}>
      <ShoppingCart className="w-7 h-7 text-gray-500" />
      {/* {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartItemCount}
        </span>
      )} */}
    </Button>
  );
};
