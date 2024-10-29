import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authStatusType, Layout } from "../common/components/Layout";
import { useCartStore } from "@/store/cart/useCartStore";
import { CartCardSquare } from "../common/components/CartCard";
import { useAuthStore } from "@/store/auth/useAuthStore";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";

export const CartPage: React.FC = () => {
  const { cart, removeCartItem, totalCount, totalPrice, changeCartItemCount } =
    useCartStore();
  const { user } = useAuthStore();

  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-12">
        <div className="min-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gold">장바구니</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Table className="w-full border border-b-gray-100">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/5 text-center">
                      제품
                    </TableHead>
                    <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/5 text-center">
                      가격
                    </TableHead>
                    <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/6">
                      수량
                    </TableHead>
                    <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/5 text-center">
                      이미지
                    </TableHead>
                    <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/5 text-center">
                      관리
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart?.map((car) => (
                    <CartCardSquare
                      key={car.id}
                      product={car}
                      user={user}
                      removeCartItem={removeCartItem}
                      changeCartItem={changeCartItemCount}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gold">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span> {/* 총 가격 표시 */}
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
                    <span>${(totalPrice + 720).toFixed(2)}</span>{" "}
                    {/* 총 금액 표시 */}
                  </div>
                  <div className="flex justify-between">
                    <span>Total Items</span>
                    <span>{totalCount}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
