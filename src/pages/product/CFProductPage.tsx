import React, { useEffect } from "react";
import { useFetchProducts } from "@/lib/products/hooks/useFetchProducts";
import { Layout } from "../common/components/Layout";
import { ProductCard } from "../home/components/ProductCard";
import { ProductFilter } from "../home/components/ProductFilter";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

export const CFProductPage: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useFetchProducts({
    pageSize: 8,
  });
  const { ref, inView } = useInView();

  const products = data ? data.pages.flatMap((page) => page.products) : [];
  const totalCount = data?.pages[0]?.totalCount || 0;

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-16">
        <ProductFilter totalCount={totalCount} />
        <hr className="mt-3 mb-10"></hr>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
