import { Layout } from "../common/components/Layout";
import { authStatusType } from "@/constants";
import { Profile } from "../productListing/components/Profile";

export const PurchasePage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-32 ">
        <div className="min-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gold">마이페이지</h1>
          <Profile />
        </div>
      </div>
    </Layout>
  );
};
