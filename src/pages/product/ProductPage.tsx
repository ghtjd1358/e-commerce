import React, { Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";
import {
  ALL_CATEGORY_ID,
  authStatusType,
  PRODUCT_PAGE_SIZE,
} from "@/shared/constants";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useFetchInfiniteQueryProducts } from "@/features/products/hooks/useFetchInfiniteQueryProducts";
import { Layout } from "../common/components/Layout";
import { ProductFilter } from "./components/ProductFilter";
import { Button } from "../common/ui/button";
import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";
import { ProductList } from "./components/ProductList";

export const ProductPage: React.FC = () => {
  const [searchParams ] = useSearchParams();
  console.log('searchParams', searchParams)
  const category = searchParams.get("category") || ALL_CATEGORY_ID; 
  console.log('category', category)
  const { user, isLogin } = useAuthStore();

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useFetchInfiniteQueryProducts({
      pageSize: 20,
    });

  const { ref, inView } = useInView();

  const totalCount = data?.pages[0]?.totalCount || 0;

  const products = data ? data.pages.flatMap((page) => page.products) : [];
    
  const filteredProducts =
    category === ALL_CATEGORY_ID
      ? products
      : products.filter((product) => product.productCategory.name === category);
      console.log(filteredProducts)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <Layout authStatus={authStatusType.COMMON}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-16 pt-28">
        <ProductFilter
          totalCount={
            category === ALL_CATEGORY_ID ? totalCount : filteredProducts.length
          }
          category={category}
          filteredProducts={filteredProducts}
        />

        <hr className="mt-3 mb-10" />
        <ApiErrorBoundary>
          <Suspense fallback={<LoadingSkeleton />}>
            <ProductList
              filteredProducts={filteredProducts}
              isLogin={isLogin}
              user={user}
              isLoading={isLoading}
              pageSize={20}
            />
          </Suspense>
        </ApiErrorBoundary>

        {hasNextPage && (
          <div className="flex justify-center items-center">
            <Button variant="outline" ref={ref} className="w-full bg-gray-700">
              {isFetching ? "...로딩중" : "fetching"}
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {[...Array(PRODUCT_PAGE_SIZE)].map((_, index) => (
      <div
        key={index}
        className="h-64 bg-gray-600 rounded-lg animate-pulse mb-32 w-full"
      />
    ))}
  </div>
);
