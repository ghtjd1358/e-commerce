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
  const { cart, removeCartItem, changeCartItemCount } = useCartStore();
  const { user } = useAuthStore();

  return (
    <div className="w-full lg:min-w-[60%] ">
      <Table className="space-y-4 rounded-lg">
        <TableHeader>
          <TableRow>
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
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
