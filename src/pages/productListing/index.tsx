import { authStatusType, Layout } from "../common/components/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User } from "lucide-react";
import { ProductList } from "./components/ProductList";
import { Profile } from "./components/Profile";

interface ProductListProps {
  pageSize?: number;
}

export const ProductListingPage: React.FC<ProductListProps> = () => {
  return (
    <Layout authStatus={authStatusType.IS_SELLER}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-20 ">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gold">마이페이지</h1>
          <Profile />
          <ProductList />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-gold hover:bg-gold/90 text-gray-900">
              <ShoppingBag className="mr-2 h-4 w-4" /> View Cart
            </Button>
            <Button
              variant="outline"
              className="border-gold text-gray-900 hover:bg-gold hover:text-gray-900"
            >
              <User className="mr-2 h-4 w-4" /> Manage Account
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
