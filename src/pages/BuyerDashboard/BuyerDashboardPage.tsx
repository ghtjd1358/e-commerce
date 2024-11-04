import React, { useEffect, useState } from "react";
import { authStatusType } from "@/shared/constants";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { getOrdersForBuyerApi } from "@/features/order/api";
import { Layout } from "../common/components/Layout";
import { Profile } from "../common/components/auth/Profile";
import { ProductOrderList } from "./components/ProductOrderList";

export const BuyerDashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.uid) {
        try {
          const fetchedData = await getOrdersForBuyerApi(user.uid);
          setData(fetchedData);
          console.log(fetchedData);
        } catch (error) {
          console.error("주문 목록을 가져오는 중 오류가 발생했습니다:", error);
        }
      }
    };

    fetchOrders();
  }, [user?.uid]);

  return (
    <Layout authStatus={authStatusType.IS_BUYER}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-32 ">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gold">마이페이지</h1>
          <Profile />
          <ProductOrderList productOrder={data} />
        </div>
      </div>
    </Layout>
  );
};
