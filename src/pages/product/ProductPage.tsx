import React from "react";
import { useSearchParams } from "react-router-dom";
import { ALL_CATEGORY_ID, authStatusType, PRODUCT_PAGE_SIZE } from "@/shared/constants";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Layout } from "../common/components/Layout";
import { ProductFilter } from "./components/ProductFilter";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { ProductList } from "./components/ProductList";
import { useFetchInfiniteQueryProducts } from "@/features/products/hooks/useFetchInfiniteQueryProducts";

export const ProductPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || ALL_CATEGORY_ID;
  const { user, isLogin } = useAuthStore();

  const { infiniteQuery } = useFetchInfiniteQueryProducts({
    pageSize: PRODUCT_PAGE_SIZE,
  });

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = infiniteQuery

  const products = data ? data.pages.flatMap((page) => page.products) : [];

  // 카테고리 필터링
  const filteredProducts =
    category === ALL_CATEGORY_ID
      ? products
      : products.filter((product) => product.productCategory.name === category);

  return (
    <Layout authStatus={authStatusType.COMMON}>
      <div className="w-full">
      <div className="max-w-screen-xl mx-auto">
        <ProductFilter
          category={category}
          
        />
        </div>
        <div className="max-w-screen-xl mx-auto">
        <hr className="mt-3 mb-10" />
        <ApiErrorBoundary>
          <ProductList
            filteredProducts={filteredProducts}
            isLogin={isLogin}
            user={user}
            isLoading={isLoading}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
          />
        </ApiErrorBoundary>
        </div>
      </div>
    </Layout>
  );
};
