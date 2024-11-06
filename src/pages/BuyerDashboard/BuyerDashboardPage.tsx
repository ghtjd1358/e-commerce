import { authStatusType } from "@/shared/constants";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Layout } from "../common/components/Layout";
import { Profile } from "../common/components/auth/Profile";
import { BuyerProductList } from "./components/BuyerProductList";
import { useBuyerOrders } from "@/features/order/hooks/useFetchOrders";
import { useFetchProducts } from "@/features/products/hooks/useFetchProducts";
import { OrderType } from "@/features/order/types";

interface Order {
  id: string;
  buyerId: string;
  productId: string;
}

export const BuyerDashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { data: products } = useFetchProducts();
  const { data: orders } = useBuyerOrders(user?.uid ?? "") as {
    data: Order[] | undefined;
  };

  const buyerProductsMerge: (Partial<OrderType> | null)[] = (orders ?? [])
    .filter((order) => order.buyerId === user?.uid)
    .map((order) => {
      const product = products?.find((item) => item.id === order.productId);
      if (!product) {
        return null;
      }
      return {
        ...order,
        productName: product.productName ?? "",
        productImage: product.productImage?.[0] ?? "",
      };
    });

  return (
    <Layout authStatus={authStatusType.IS_BUYER}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-32">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gold">마이페이지</h1>
          <Profile />
          <BuyerProductList products={buyerProductsMerge} />
        </div>
      </div>
    </Layout>
  );
};
