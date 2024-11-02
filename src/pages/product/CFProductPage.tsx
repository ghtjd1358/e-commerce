import React, { useEffect } from "react";
import { useFetchInfiniteQueryProducts } from "@/lib/products/hooks/useFetchInfiniteQueryProducts";
import { Layout } from "../common/components/Layout";
import { ProductCard } from "../common/components/ProductCard";
import { ProductFilter } from "./components/ProductFilter";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { useNavigate, useParams } from "react-router-dom";
import { ALL_CATEGORY_ID, authStatusType } from "@/constants";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useCartStore } from "@/store/cart/useCartStore";
import { useToastStore } from "@/store/toast/useToastStore";
import { pageRoutes } from "@/apiRouters";
import { IProduct } from "@/lib/products/type";
import { CartItem } from "@/store/cart/type";

export const CFProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLogin } = useAuthStore();
  const { cart, addCartItem } = useCartStore();
  const { addToast } = useToastStore();
  const { category } = useParams();

  const { data, fetchNextPage, hasNextPage, isFetching } =
    useFetchInfiniteQueryProducts({
      pageSize: 20,
    });
  const { ref, inView } = useInView();

  const cartItemCount = cart.map((item) => item.id);

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

  // 장바구니
  const handleCartAction = (product: IProduct): void => {
    if (isLogin && user) {
      const cartItem: CartItem = { ...product, count: 1 };
      addCartItem(cartItem, user.uid, 1);
      addToast(
        `${product.productName} 상품이 장바구니에 담겼습니다.`,
        "success",
      );
    } else {
      navigate(pageRoutes.login);
    }
  };

  const handlePurchaseAction = (product: IProduct): void => {
    if (isLogin && user) {
      const cartItem: CartItem = { ...product, count: 1 };
      addCartItem(cartItem, user.uid, 1);
      navigate(pageRoutes.cart);
    } else {
      navigate(pageRoutes.login);
    }
  };

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

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cart={cartItemCount}
                onClickAddCartButton={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleCartAction(product);
                }}
                onClickPurchaseButton={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handlePurchaseAction(product);
                }}
              />
            ))
          ) : (
            <div>해당 카테고리에 상품이 없습니다.</div>
          )}
        </div>
        {hasNextPage && (
          <div className="flex justify-center items-center ">
            <Button variant="outline" ref={ref} className="w-full bg-gray-700">
              {isFetching ? "...loading" : "fetching"}
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};
