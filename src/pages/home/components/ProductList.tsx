import React from "react";
import { Button } from "@/components/ui/button";
import { useFetchProducts } from "@/lib/products/hooks/useFetchProducts";
import { ProductCard } from "./ProductCard";
import { IProduct } from "@/lib/products/type";
import { Link } from "react-router-dom";
import { pageRoutes } from "@/apiRouters";

interface ProductListProps {
  pageSize?: number;
}

export const ProductList: React.FC<ProductListProps> = ({ pageSize = 20 }) => {
  const { data, fetchNextPage, hasNextPage } = useFetchProducts({
    pageSize,
  });

  const products = data ? data.pages.flatMap((page) => page.products) : [];

  const groupedProducts = products.reduce(
    (acc, product) => {
      const category = product.productCategory.name;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    },
    {} as Record<string, IProduct[]>,
  );

  return (
    <main>
      <section className="mt-12 p-10">
        <div className="flex justify-between items-center mb-6">
          <h2>상품목록</h2>
        </div>

        {Object.entries(groupedProducts).map(([category, items]) => (
          <div key={category} className="mb-12">
            <div className="flex justify-between">
              <h3 className="text-3xl font-bold mb-4">{category}</h3>
              <Link to={pageRoutes.cfproduct}>
                <h3 className="text-lg font-bold mb-4">더보기</h3>
              </Link>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {items.slice(0, pageSize).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}

        {/* Load More 버튼 */}
        {hasNextPage && (
          <div className="text-center mt-8">
            <Button onClick={() => fetchNextPage()} variant="outline">
              Load More
            </Button>
          </div>
        )}
      </section>
    </main>
  );
};
