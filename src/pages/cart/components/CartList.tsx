import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/pages/common/ui/table";
import React from "react";
import { CartCard } from "./CartCard";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useCartStore } from "@/store/cart/useCartStore";
import { EmptyProduct } from "@/pages/common/components/EmptyProduct";

export const CartList: React.FC = () => {
  const {
    cart,
    removeCartItem,
    changeCartItemCount,
    selectCartItem,
    selectAllCartItems,
  } = useCartStore();
  const { user } = useAuthStore();

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectAllCartItems(e.target.checked);
  };

  return (
    <div className="w-full lg:min-w-[60%]">
      <Table className="space-y-4 rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-100 bg-gray-800 text-center text-sm sm:text-base sticky top-0 z-10 w-1/5">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                className="mr-2"
              />
            </TableHead>
            {["제품", "가격", "수량", "이미지", "관리"].map((title) => (
              <TableHead
                key={title}
                className="text-gray-100 bg-gray-800 text-center text-sm sm:text-base sticky top-0 z-10 w-1/5"
              >
                {title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.length === 0 ? (
            <TableRow>
              <td colSpan={5}>
                <EmptyProduct />
              </td>
            </TableRow>
          ) : (
            cart.map((car) => (
              <CartCard
                key={car.id}
                product={car}
                user={user}
                removeCartItem={removeCartItem}
                changeCartItemCount={changeCartItemCount}
                selectCartItem={selectCartItem}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
