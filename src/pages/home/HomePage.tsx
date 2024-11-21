import { authStatusType } from "@/shared/constants";
import { MainArticleSlider } from "./components/MainArticleSlider";
import { Layout } from "../common/components/Layout";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { MainProductList } from "./components/MainProductList";

export const HomePage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.COMMON}>
      <div className="w-full bg-gray-800 text-gray-200">
        <MainArticleSlider />
        <ApiErrorBoundary>
          <MainProductList />
        </ApiErrorBoundary>
      </div>
    </Layout>
  );
};
