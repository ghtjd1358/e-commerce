import { ProductList } from "./components/ProductList";
import { Layout } from "../common/components/Layout";
import { MainArticleSlider } from "./components/MainArticleSlider";
import { ProductFilter } from "./components/ProductFilter";

export const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="w-full bg-gray-800 text-gray-200">
        {/* Slider */}
        <MainArticleSlider />
        <ProductFilter />
        {/* list */}
        <ProductList />
      </div>
    </Layout>
  );
};
