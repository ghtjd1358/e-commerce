import { ALL_CATEGORY_ID, authStatusType, PRODUCT_PAGE_SIZE } from "@/shared/constants";
import { Layout } from "../common/components/Layout";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { MainArticleSlider } from "./components/MainArticleSlider";
import { Suspense } from "react";
import { useFetchInfiniteQueryProducts } from "@/features/products/hooks/useFetchInfiniteQueryProducts";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { MainCategoryList } from "./components/MainCategoryList";
import { MainProductList } from "./components/MainProductList";
import { MainProductFilter } from "./components/MainProductFilter";

export const HomePage: React.FC = () => {
  const category = ALL_CATEGORY_ID; 
  const { user, isLogin } = useAuthStore();

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useFetchInfiniteQueryProducts({
      pageSize: 20,
    });

  const products = data ? data.pages.flatMap((page) => page.products) : [];
    
  const filteredProducts =
    category === ALL_CATEGORY_ID
      ? products
      : products.filter((product) => product.productCategory.name === category);
  return (
    <Layout authStatus={authStatusType.COMMON}>
      <div className="w-full">
        {/* 메인 아티클  */}
        <div className="w-full">
          <MainArticleSlider />
        </div>
        {/* 카테고리별 상품카드  */}
        <div className="max-w-screen-xl mx-auto">
          <ApiErrorBoundary>
            <MainCategoryList />
          </ApiErrorBoundary>
        </div>

        {/* 전체상품(무한스크롤) */}
        <div className="max-w-screen-xl mx-auto">
        <MainProductFilter
          category={category}
        />
        <hr className="mt-3 mb-10" />
        <ApiErrorBoundary>
          <Suspense fallback={<LoadingSkeleton />}>
            <MainProductList
              filteredProducts={filteredProducts}
              isLogin={isLogin}
              user={user}
              isLoading={isLoading}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetching={isFetching}
            />
          </Suspense>
        </ApiErrorBoundary>
      </div>
    </div>
    </Layout>
  );
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {[...Array(PRODUCT_PAGE_SIZE)].map((_, index) => (
      <div
        key={index}
        className="h-64 rounded-lg animate-pulse mb-32 w-full"
      />
    ))}
  </div>
);