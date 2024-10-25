import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFetchProducts } from "@/lib/products/hooks/useFetchProducts";

interface ProductListProps {
  pageSize?: number;
}

export const ProductList: React.FC<ProductListProps> = ({ pageSize = 5 }) => {
  const { data, fetchNextPage, hasNextPage } = useFetchProducts({ pageSize });
  const products = data ? data.pages.flatMap((page) => page.products) : [];

  return (
    <main>
      <section className="mt-12 p-10">
        <div className="flex justify-between items-center mb-6">
          <h2>상품목록</h2>
        </div>

        {/* 필터 컴포넌트 추가 */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <img
                  src={product.productImage[0]}
                  alt={product.productName}
                  className="w-full h-[192px] object-cover mb-4 rounded-lg"
                />
                <h3 className="text-lg font-semibold mb-2">
                  {product.productName}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-yellow-500 font-bold">
                    ${product.productPrice}
                  </span>
                </div>
                <Button className="w-full bg-gold hover:bg-gold/90 text-gray-900">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

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
