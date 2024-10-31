import { TableCell, TableRow } from "@/components/ui/table";
import React, { useState } from "react";
import { IProduct } from "@/lib/products/type";
import { useToastStore } from "@/store/toast/useToastStore";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: IProduct;
  removeCartItem: (itemId: string, userId: string) => void;
  user: { uid: string } | null;
  changeCartItemCount: (itemId: string, count: number, userId: string) => void;
}

export const CartCardSquare: React.FC<ProductCardProps> = ({
  product,
  removeCartItem,
  changeCartItemCount,
  user,
}) => {
  const { addToast } = useToastStore();
  const [count, setCount] = useState<number>(product.count || 1);

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

  return (
    <>
      <TableRow key={product.id} className=" cursor-pointer">
        <TableCell className="text-gray-400 w-1/4 overflow-hidden overflow-ellipsis whitespace-normal">
          {product.productName}
        </TableCell>
        <TableCell className="text-gray-400 w-1/4 overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
          $ {product.productPrice}
        </TableCell>
        <TableCell className="text-gray-400 w-1/4 flex items-center justify-center space-x-3 mt-4">
          <Button
            onClick={handleDecrease}
            className="px-2 border border-gray-300"
          >
            -
          </Button>
          <span>{count}</span>
          <Button onClick={handleIncrease} className="px-2">
            +
          </Button>
        </TableCell>
        <TableCell className="w-1/4 text-center">
          <img
            src={product.productImage[0]}
            alt={product.productName}
            className="w-16 h-16 object-cover m-auto"
          />
        </TableCell>
        <TableCell className="text-center">
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
