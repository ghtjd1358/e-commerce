import { authStatusType } from "@/shared/constants";
import { Layout } from "../common/components/Layout";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Profile } from "../common/components/auth/Profile";
import { BuyerProductList } from "./components/BuyerProductList";

export const BuyerDashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <Layout authStatus={authStatusType.IS_BUYER}>
      <div className="w-full bg-gray-50 text-black">
        <div className="mt-28 max-w-screen-xl mx-auto space-y-8">
          <ApiErrorBoundary>
              <Profile />
              <BuyerProductList buyerId={user?.uid ?? ""} />
          </ApiErrorBoundary>
        </div>
      </div>
    </Layout>
  );
};
