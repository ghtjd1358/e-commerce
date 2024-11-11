import { authStatusType } from "@/shared/constants";
import { SummaryTable } from "./components/SummaryTable";
import { Layout } from "../common/components/Layout";
import { CartList } from "./components/CartList";

export const ShoppingCartPage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-28">
        <div className="min-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gold">장바구니</h1>
          <div className="flex  justify-between gap-11">
            <CartList />
            <SummaryTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};
