import { authStatusType } from "@/shared/constants";
import { Layout } from "../common/components/Layout";
import { lazy, Suspense } from "react";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { BuyerOrderSkeleton } from "./components/skeleton/BuyerOrderSkeleton";
import { Profile } from "../common/components/auth/Profile";
import { BuyerProductList } from "./components/BuyerProductList";

export const BuyerDashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <Layout authStatus={authStatusType.IS_BUYER}>
      <div className="w-full bg-gray-50 text-black">
        <div className="mt-28 max-w-screen-xl mx-auto space-y-8">
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
