import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFetchProducts } from "@/lib/products/hooks/useFetchProducts";
import { ProductFilter } from "./ProductFilter";
import { Link } from "react-router-dom";
import { pageRoutes } from "@/apiRouters";

interface ProductListProps {
  pageSize?: number;
}

export const ProductList: React.FC<ProductListProps> = ({ pageSize = 5 }) => {
  const { data, fetchNextPage, hasNextPage } = useFetchProducts({
    pageSize,
  });

  const products = data ? data.pages.flatMap((page) => page.products) : [];

  return (
    <main>
      <section className="mt-12 p-10">
        <div className="flex justify-between items-center mb-6">
          <h2>상품목록</h2>
        </div>
        <ProductFilter />
        {/* 필터 컴포넌트 추가 */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <Link
              to={`${pageRoutes.productDetail}/${product.id}`}
              key={product.id} // 여기에서 key prop 추가
            >
              <Card className="bg-gray-800 border-gray-700 gap-y-6">
                <CardContent className="p-4">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="w-full h-[192px] object-cover mb-4 rounded-lg"
                  />
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold text-yellow-500">
                      {product.productName}
                    </h3>
                    {/* 별점 표시 영역 */}
                    <div className="flex items-center text-gray-400 space-x-1"></div>
                  </div>
                  <div className="flex justify-between items-center mb-12 my-2">
                    <span className="text-gray-300 font-bold">
                      $ {product.productPrice}
                    </span>
                    <span className="text-gray-400">
                      {product.productCategory.name}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 bg-gold hover:bg-gold/90  rounded-lg py-2 text-white">
                      구매하기
                    </Button>
                    <Button className="flex-1 bg-gold hover:bg-gold/90 text-white rounded-lg py-2">
                      장바구니
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
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
