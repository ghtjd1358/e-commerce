import { ProductList } from "./components/ProductList";
import { authStatusType, Layout } from "../common/components/Layout";
import { MainArticleSlider } from "./components/MainArticleSlider";

export const HomePage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.COMMON}>
      <div className="w-full bg-gray-800 text-gray-200">
        {/* Slider */}
        <MainArticleSlider />
        {/* list */}
        <ProductList />
      </div>
    </Layout>
  );
};
