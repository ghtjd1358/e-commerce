import { authStatusType } from "@/shared/constants";
import { Layout } from "../common/components/Layout";

export const SalesHistoryPage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.IS_SELLER}>
      <h1>하잇</h1>
    </Layout>
  );
};
