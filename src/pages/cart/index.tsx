import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authStatusType, Layout } from "../common/components/Layout";
import { useCartStore } from "@/store/cart/useCartStore";
import { CartCardSquare } from "../common/components/CartCard";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const CartPage: React.FC = () => {
  const { cart, removeCartItem, totalCount, totalPrice } = useCartStore();
  const { user } = useAuthStore();

  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-12">
        <div className="min-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gold">Your Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cart?.map((car) => (
                <CartCardSquare
                  key={car.id}
                  product={car}
                  user={user}
                  removeCartItem={removeCartItem} // removeCartItem을 프롭스로 전달
                />
              ))}
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
                    <span>{totalCount}</span> {/* 총 개수 표시 */}
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
