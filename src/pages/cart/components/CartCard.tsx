import React, { useState } from "react";
import { CartItem } from "@/store/cart/type";
import { useToastStore } from "@/store/toast/useToastStore";
import { Trash2 } from "lucide-react";
import { Button } from "@/pages/common/ui/button";
import { TableCell, TableRow } from "@/pages/common/ui/table";

interface ProductCardProps {
  product: CartItem;
  removeCartItem: (itemId: string, userId: string) => void;
  user: { uid: string } | null;
  changeCartItemCount: (itemId: string, count: number, userId: string) => void;
  selectCartItem: (itemId: string) => void;
}

export const CartCard: React.FC<ProductCardProps> = ({
  product,
  user,
  removeCartItem,
  changeCartItemCount,
  selectCartItem,
}) => {
  const { addToast } = useToastStore();
  const [count, setCount] = useState<number>(product.count);

  const handleRemoveItem = () => {
    if (user) {
      removeCartItem(product.id, user.uid);
      addToast(
        `${product.productName}이(가) 카트에서 삭제되었습니다.`,
        "success",
      );
    } else {
      addToast("사용자가 로그인하지 않았습니다.", "error");
    }
  };

  const handleIncrease = () => {
    if (user) {
      const newCount = count + 1;
      setCount(newCount);
      changeCartItemCount(product.id, newCount, user.uid);
    }
  };

  const handleDecrease = () => {
    if (user && count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      changeCartItemCount(product.id, newCount, user.uid);
    }
  };

  const handleSelect = () => {
    selectCartItem(product.id);
  };

  return (
    <>
      <TableRow key={product.id} className="cursor-pointer">
        <TableCell className="text-gray-400 text-center overflow-hidden overflow-ellipsis whitespace-normal">
          <input
            type="checkbox"
            checked={product.isSelected}
            onChange={handleSelect}
            className="mr-2"
          />
                
        </TableCell>
        <TableCell className="text-gray-400 w-1/4 overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
          {product.productName}
        </TableCell>
        <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
          $ {product.productPrice}
        </TableCell>
        <TableCell className="w-1/4 text-center">
          <img
            src={product.productImage[0]}
            alt={product.productName}
            className="w-30 h-28 object-fill m-auto"
          />
        </TableCell>
        <TableCell className="text-gray-400 flex items-center justify-center space-x-3 mt-10">
          <Button
            onClick={handleDecrease}
            className="px-2 bg-gray-600"
          >
            -
          </Button>
          <span>{count}</span>
          <Button onClick={handleIncrease} className="px-2 bg-gray-600">
            +
          </Button>
        </TableCell>
        
        <TableCell className="w-1/6 text-center">
          <button
            onClick={handleRemoveItem}
            className="text-red-500 hover:underline text-center"
          >
            <Trash2 />
          </button>
        </TableCell>
      </TableRow>
    </>
  );
};
