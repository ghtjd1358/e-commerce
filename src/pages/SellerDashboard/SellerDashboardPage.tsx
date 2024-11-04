import { authStatusType } from "@/shared/constants";
import { Layout } from "../common/components/Layout";
import { Profile } from "../common/components/auth/Profile";
import { SellerProductList } from "./components/SellerProductList";

interface ProductListProps {
  pageSize?: number;
}

export const SellerDashboardPage: React.FC<ProductListProps> = () => {
  return (
    <Layout authStatus={authStatusType.IS_SELLER}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-20 ">
        <div className="min-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gold">마이페이지</h1>
          <Profile />
          <SellerProductList />
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-gold hover:bg-gold/90 text-gray-900">
              <ShoppingBag className="mr-2 h-4 w-4" /> View Cart
            </Button>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};
