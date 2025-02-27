import React, { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useModalContext } from "@/shared/hooks/useModalContext";
import { useScrollThreshold } from "@/shared/hooks/useScroll";
interface User {
  uid: string;
  photoURL?: string | null;
  nickname?: string;
}

interface CartButtonProps {
  user?: User | null;
  cartLength: number;
  initCart: (uid: string) => void;
  resetCart: (uid: string) => void;
}

export const CartButton: React.FC<CartButtonProps> = ({
  user,
  cartLength,
  initCart,
  resetCart,
}) => {
  useEffect(() => {
    if (user?.uid) {
      initCart(user.uid);
    } else {
      resetCart("guest");
    }
  }, [user?.uid, initCart, resetCart]);

  const { openModal } = useModalContext()
  const isScrolled = useScrollThreshold(60);

  
  return (
    <Button variant={null} onClick={openModal} className="relative">
      <ShoppingCart className={`w-7 h-7 ${isScrolled ? "text-black" : "text-gray-200" }`} />
      {cartLength > 0 && (
        <span className="absolute -top-1 right-1 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
          {cartLength}
        </span>
      )}
    </Button>
  );
};
