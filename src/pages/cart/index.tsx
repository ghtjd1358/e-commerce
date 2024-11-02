import { Layout } from "../common/components/Layout";
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
import { authStatusType } from "@/constants";
import { SummaryTable } from "./components/SummaryTable";

export const CartPage: React.FC = () => {
  const { cart, removeCartItem, totalCount, totalPrice, changeCartItemCount } =
    useCartStore();
  const { user } = useAuthStore();

  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-28">
        <div className="min-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gold">장바구니</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Table className="w-full ">
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
                      changeCartItemCount={changeCartItemCount}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <SummaryTable totalCount={totalCount} totalPrice={totalPrice} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
