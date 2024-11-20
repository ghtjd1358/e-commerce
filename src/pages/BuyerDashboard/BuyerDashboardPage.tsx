import { authStatusType } from "@/shared/constants";
import { Layout } from "../common/components/Layout";
import { Suspense } from "react";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { BuyerOrderSkeleton } from "./components/skeleton/BuyerOrderSkeleton";
import { Profile } from "../common/components/auth/Profile";
import { BuyerProductList } from "./components/BuyerProductList";

export const BuyerDashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <Layout authStatus={authStatusType.IS_BUYER}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-32">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gold">마이페이지</h1>
          <ApiErrorBoundary>
            <Suspense fallback={<BuyerOrderSkeleton />}>
              <Profile />
              <BuyerProductList buyerId={user?.uid ?? ""} />
            </Suspense>
          </ApiErrorBoundary>
        </div>
      </div>
    </Layout>
  );
};
