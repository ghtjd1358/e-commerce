import { authStatusType } from "@/shared/constants";
import { Layout } from "../common/components/Layout";
import { CheckoutProductTable } from "./components/CheckoutProductTable";
import { useFetchOrders } from "@/features/order/hooks/useFetchOrders";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useFetchProducts } from "@/features/products/hooks/useFetchProducts";
import { OrderType } from "@/features/order/types";
import { ProfilePayload } from "./components/ProfilePayload";
// import { lazy } from "react";
import { CheckoutBtn } from "./components/CheckoutBtn";
import { Profile } from "../common/components/auth/Profile";

// const Profile = lazy(() =>
//   import("../common/components/auth/Profile").then((module) => ({
//     default: module.Profile,
//   })),
// );

interface Order {
  id: string;
  buyerId: string;
  productId: string;
}

export const CheckoutPage: React.FC = () => {
  const { user, isLoading } = useAuthStore();
  const { data: products } = useFetchProducts();
  const { data: buyer } = useFetchOrders(user?.uid || "", ["결제 대기"]) as {
    data: Order[] | undefined;
  };

  const buyerProductsMerge: (Partial<OrderType> | null)[] = (buyer ?? [])
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

  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-32 ">
        <div className="min-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gold">결제페이지</h1>
          <Profile />
          <ProfilePayload user={user} isLoading={isLoading} />
          <CheckoutProductTable buyer={buyerProductsMerge} />
          <CheckoutBtn/>
        </div>
      </div>
    </Layout>
  );
};
