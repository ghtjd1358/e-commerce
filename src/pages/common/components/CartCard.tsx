import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { IProduct } from "@/lib/products/type";
import { useToastStore } from "@/store/toast/useToastStore";

interface ProductCardProps {
  product: IProduct;
  removeCartItem: (itemId: string, userId: string) => void; // removeCartItem 프롭스 추가
  user: { uid: string } | null; // 사용자 정보를 위한 프롭스 추가
}

export const CartCardSquare: React.FC<ProductCardProps> = ({
  product,
  removeCartItem,
  user,
}) => {
  const { addToast } = useToastStore();

  const handleRemoveItem = () => {
    if (user) {
      removeCartItem(product.id, user.uid); // 아이템 삭제 호출
      addToast(
        `${product.productName}이(가) 카트에서 삭제되었습니다.`,
        "success",
      ); // 삭제 후 토스트 메시지
    } else {
      addToast("사용자가 로그인하지 않았습니다.", "error"); // 로그인하지 않은 경우 메시지
    }
  };

  return (
    <>
      <TableRow key={product.id}>
        <TableCell className="text-gray-400 w-1/6">{product.id}</TableCell>
        <TableCell className="text-gray-400 w-1/4 overflow-hidden overflow-ellipsis whitespace-normal">
          {product.productName}
        </TableCell>
        <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {product.productPrice} 원
        </TableCell>
        <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {product.productQuantity} 개
        </TableCell>
        <TableCell className="w-1/5">
          <img
            src={product.productImage[0]}
            alt={product.productName}
            className="w-16 h-16 object-cover"
          />
        </TableCell>
        <TableCell className="font-medium text-gray-400 w-1/4 overflow-hidden overflow-ellipsis whitespace-normal">
          {product.updatedAt.slice(0, 10)}
        </TableCell>
        <TableCell>
          <button
            onClick={handleRemoveItem}
            className="text-red-500 hover:underline"
          >
            삭제
          </button>
        </TableCell>
      </TableRow>
    </>
  );
};
