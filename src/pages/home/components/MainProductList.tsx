import React from "react";
import { IProduct } from "@/features/products/type";
import { Link, useNavigate } from "react-router-dom";
import { pageRoutes } from "@/app/apiRouters";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useToastStore } from "@/store/toast/useToastStore";
import { useCartStore } from "@/store/cart/useCartStore";
import { CartItem } from "@/store/cart/type";
import { useFetchProducts } from "@/features/products/hooks/useFetchProducts";
import { ProductCard } from "@/pages/common/components/product/ProductCard";
import { ProductCardSkeleton } from "./MainProductListSkeleton";
import { EmptyProduct } from "@/pages/common/components/EmptyProduct";
import { useQueryClient } from "@tanstack/react-query";
import { fetchFilterProductsApi } from "@/features/products/api";
import { PRODUCT_KEY } from "@/features/products/key";

export const MainProductList: React.FC = () => {
  const { data, isLoading } = useFetchProducts();
  const { user, isLogin } = useAuthStore();
  const { cart, addCartItem } = useCartStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const cartItem = cart.map((item) => item.id);

  // group products
  const groupedProducts =
    data?.reduce(
      (acc, product) => {
        const category = product.productCategory.name;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      },
      {} as Record<string, IProduct[]>,
    ) || {};

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
      navigate(pageRoutes.shoppingcart);
    } else {
      navigate(pageRoutes.login);
    }
  };

  // prefetch
  const handlePrefetchProducts = async (categoryId: string) => {
    const queryKey = [PRODUCT_KEY, { categoryId }];

    // 캐시에 데이터가 있는지 확인
    const cachedData = queryClient.getQueryData(queryKey);

    if (!cachedData) {
      await queryClient.prefetchQuery({
        queryKey,
        queryFn: async () => {
          const filter = { categoryId };
          const response = await fetchFilterProductsApi(filter, 20, 1);
          return response.products;
        },
      });
    }
  };

  return (
    <main>
      <section className="mt-12 p-10">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : Object.keys(groupedProducts).length === 0 ? (
          <EmptyProduct />
        ) : (
          Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="mb-12">
              <div className="flex justify-between">
                <h3 className="text-3xl font-bold mb-6">{category}</h3>
                <Link
                  to={`${pageRoutes.product}?category=${items[0].productCategory.name}`}
                  onMouseEnter={() =>
                    handlePrefetchProducts(items[0].productCategory.id)
                  }
                >
                  <h3 className="text-lg font-bold mb-4">더보기</h3>
                </Link>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {items.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    cart={cartItem}
                    product={product}
                    onClickAddCartButton={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      handleCartAction(product);
                    }}
                    onClickPurchaseButton={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      handlePurchaseAction(product);
                    }}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
};
