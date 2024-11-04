import { authStatusType } from "@/shared/constants";
import { MainProductList } from "@/pages/home/components/MainProductList";
import { MainArticleSlider } from "./components/MainArticleSlider";
import { Layout } from "../common/components/Layout";

export const HomePage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.COMMON}>
      <div className="w-full bg-gray-800 text-gray-200">
        <MainArticleSlider />
        <MainProductList />
      </div>
    </Layout>
  );
};
