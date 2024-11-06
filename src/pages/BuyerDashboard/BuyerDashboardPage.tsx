import { authStatusType } from "@/shared/constants";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Layout } from "../common/components/Layout";
import { Profile } from "../common/components/auth/Profile";
import { BuyerProductList } from "./components/BuyerProductList";
import { useBuyerOrders } from "@/features/order/hooks/useFetchOrders";
import { useFetchProducts } from "@/features/products/hooks/useFetchProducts";

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

  const buyerProductsMerge = orders
    ?.filter((order) => order.buyerId === user?.uid)
    .map((order) => {
      const product = products?.find((item) => item.id === order.productId);
      return product
        ? {
            ...order,
            productName: product.productName,
            productImage: product.productImage[0] ?? "",
            sellerId: product.sellerId,
          }
        : null;
    })
    .filter(Boolean);

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
