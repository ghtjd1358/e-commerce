import { authStatusType } from "@/shared/constants";
import { Layout } from "../common/components/Layout";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { MainArticleSlider } from "./components/MainArticleSlider";
import { MainCategoryList } from "./components/MainCategoryList";

export const HomePage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.COMMON}>
      <div className="w-full">
        {/* 메인 아티클  */}
        <div className="w-full mb-20">
          <MainArticleSlider />
        </div>
        {/* 카테고리별 상품카드  */}
        <div className="max-w-screen-xl mx-auto mb-20">
          <ApiErrorBoundary>
            <MainCategoryList />
          </ApiErrorBoundary>
        </div>
    </div>
    </Layout>
  );
};