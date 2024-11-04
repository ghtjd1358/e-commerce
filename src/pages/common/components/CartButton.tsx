import { pageRoutes } from "@/app/apiRouters";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

interface User {
  uid: string;
  photoURL?: string | null;
  nickname?: string;
}

interface CartButtonProps {
  user?: User | null;
  cartLength: number;
  initCart: (uid: string) => void;
}

export const CartButton: React.FC<CartButtonProps> = ({
  user,
  cartLength,
  initCart,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) {
      initCart(user.uid);
    }
  }, [user?.uid, initCart]);

  const handleClickCart = () => {
    navigate(pageRoutes.shoppingcart);
  };

  return (
    <Button variant="ghost" onClick={handleClickCart} className="relative">
      <ShoppingCart className="w-7 h-7 text-gray-500" />
      {cartLength > 0 && (
        <span className="absolute -top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartLength}
        </span>
      )}
    </Button>
  );
};
