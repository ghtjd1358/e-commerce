import { authStatusType } from "@/shared/constants";
import { Layout } from "../common/components/Layout";
import { Profile } from "../common/components/auth/Profile";
import { lazy, Suspense } from "react";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { useAuthStore } from "@/store/auth/useAuthStore";
// import { BuyerProductList } from "./components/BuyerProductList";

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
          <Profile />
          <ApiErrorBoundary>
            <Suspense fallback={<LoadingSkeleton />}>
              <BuyerProductList buyerId={user?.uid ?? ""} />
            </Suspense>
          </ApiErrorBoundary>
        </div>
      </div>
    </Layout>
  );
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {[...Array(12)].map((_, index) => (
      <div key={index} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
    ))}
  </div>
);
