import { authStatusType } from "@/shared/constants";
import { Layout } from "../common/components/Layout";
import { Profile } from "../common/components/auth/Profile";
import { CheckoutProductTable } from "./components/CheckoutProductTable";
import { useBuyerOrders } from "@/features/order/hooks/useFetchOrders";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useFetchProducts } from "@/features/products/hooks/useFetchProducts";

interface Order {
  id: string;
  buyerId: string;
  productId: string;
}

export const CheckoutPage: React.FC = () => {
  const { user } = useAuthStore();
  const { data: products } = useFetchProducts();
  const { data: buyer } = useBuyerOrders(user?.uid || "") as {
    data: Order[] | undefined;
  };

  const buyerProductsMerge = (buyer ?? [])
    .filter((order) => order.buyerId === user?.uid)
    .map((order) => {
      const product = products?.find((item) => item.id === order.productId);
      if (!product) {
        return null;
      }
      return {
        ...order,
        productName: product.productName ?? "",
      };
    });

  console.log("buyerProductsMerge", buyerProductsMerge);

  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-32 ">
        <div className="min-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gold">결제페이지</h1>
          <Profile />
          <CheckoutProductTable buyer={buyerProductsMerge} />
        </div>
      </div>
    </Layout>
  );
};