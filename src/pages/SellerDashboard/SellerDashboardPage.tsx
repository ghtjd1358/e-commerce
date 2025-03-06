import { authStatusType } from "@/shared/constants";
import { Layout } from "../common/components/Layout";
import { lazy, Suspense } from "react";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { SellerOrderSkeleton } from "./components/skeleton/SellerOrderSkeleton";
import { Profile } from "../common/components/auth/Profile";
import { SellerProductList } from "./components/SellerProductList";
import { SellerOrderList } from "./components/SellerOrderList";

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
