import { authStatusType } from "@/shared/constants";
import { Layout } from "../common/components/Layout";
import { lazy, Suspense } from "react";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { BuyerOrderSkeleton } from "./components/skeleton/BuyerOrderSkeleton";

const Profile = lazy(() =>
  import("../common/components/auth/Profile").then((module) => ({
    default: module.Profile,
  })),
);

const BuyerProductList = lazy(() =>
  import("./components/BuyerProductList").then((module) => ({
    default: module.BuyerProductList,
  })),
);

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
