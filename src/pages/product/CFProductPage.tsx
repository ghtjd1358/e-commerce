import React, { useEffect } from "react";
import { useFetchInfiniteQueryProducts } from "@/lib/products/hooks/useFetchInfiniteQueryProducts";
import { Layout } from "../common/components/Layout";
import { ProductCard } from "../common/components/ProductCard";
import { ProductFilter } from "./components/ProductFilter";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import { ALL_CATEGORY_ID, authStatusType } from "@/constants";

export const CFProductPage: React.FC = () => {
  const { category } = useParams();
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useFetchInfiniteQueryProducts({
      pageSize: 30,
    });
  const { ref, inView } = useInView();

  const products = data ? data.pages.flatMap((page) => page.products) : [];
  const totalCount = data?.pages[0]?.totalCount || 0;

  const filteredProducts =
    category === ALL_CATEGORY_ID
      ? products
      : products.filter((product) => product.productCategory.id === category);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <Layout authStatus={authStatusType.COMMON}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-16 pt-32">
        <ProductFilter
          totalCount={
            category === ALL_CATEGORY_ID ? totalCount : filteredProducts.length
          }
          category={category}
          filteredProducts={filteredProducts}
        />

        <hr className="mt-3 mb-10" />

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div>해당 카테고리에 상품이 없습니다.</div>
          )}
        </div>
        {hasNextPage && (
          <div className="flex justify-center space-x-2">
            <Button variant="outline" ref={ref}>
              {isFetching ? "...loading" : "fetching"}
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};
