import { authStatusType } from "@/shared/constants";
import { Layout } from "../common/components/Layout";
import { lazy, Suspense } from "react";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { SellerOrderSkeleton } from "./components/skeleton/SellerOrderSkeleton";

const Profile = lazy(() =>
  import("../common/components/auth/Profile").then((module) => ({
    default: module.Profile,
  })),
);

const SellerProductList = lazy(() =>
  import("./components/SellerProductList").then((module) => ({
    default: module.SellerProductList,
  })),
);

const SellerOrderList = lazy(() =>
  import("./components/SellerOrderList").then((module) => ({
    default: module.SellerOrderList,
  })),
);

interface ProductListProps {
  pageSize?: number;
}

export const SellerDashboardPage: React.FC<ProductListProps> = () => {
  return (
    <Layout authStatus={authStatusType.IS_SELLER}>
      <div className="w-full bg-gray-50 text-black">
        <div className="mt-28 max-w-screen-xl mx-auto space-y-8">
          <ApiErrorBoundary>
            <Suspense fallback={<SellerOrderSkeleton />}>
              <Profile />
              <SellerProductList />
              <SellerOrderList />
            </Suspense>
          </ApiErrorBoundary>
        </div>
      </div>
    </Layout>
  );
};
