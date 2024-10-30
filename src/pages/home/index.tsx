import { ProductList } from "./components/ProductList";
import { Layout } from "../common/components/Layout";
import { MainArticleSlider } from "./components/MainArticleSlider";
import { authStatusType } from "@/constants";

export const HomePage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.COMMON}>
      <div className="w-full bg-gray-800 text-gray-200">
        <MainArticleSlider />
        <ProductList />
      </div>
    </Layout>
  );
};
