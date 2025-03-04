import React, { useEffect, useState } from "react";
import { IProduct } from "@/features/products/type";
import { Link, useNavigate } from "react-router-dom";
import { pageRoutes } from "@/app/apiRouters";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useToastStore } from "@/store/toast/useToastStore";
import { useCartStore } from "@/store/cart/useCartStore";
import { CartItem } from "@/store/cart/type";
import { useFetchProducts } from "@/features/products/hooks/useFetchProducts";
import { ProductCardSkeleton } from "./MainProductListSkeleton";
import { EmptyProduct } from "@/pages/common/components/EmptyProduct";
import { useQueryClient } from "@tanstack/react-query";
import { fetchFilterProductsApi } from "@/features/products/api";
import { PRODUCT_KEY } from "@/features/products/key";
import { ProductCard } from "@/pages/common/components/Card/ProductCard";
import { categoryDisplaySettings, categoryOrder } from "@/shared/constants";

type CountType = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl?: number;
  '2xl'?: number;
};

type CategorySettingsType = {
  count: CountType;
  gridCols: string;
};

export const MainCategoryList: React.FC = () => {
  const { data, isLoading } = useFetchProducts();
  const { user, isLogin } = useAuthStore();
  const { cart, addCartItem } = useCartStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cartItem = cart.map((item) => item.id);

  const groupedProducts = data?.reduce((acc, product) => {
    const category = product.productCategory.name;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, IProduct[]>) || {};

  const handleCartAction = (product: IProduct): void => {
    if (isLogin && user) {
      const cartItem: CartItem = { ...product, count: 1 };
      addCartItem(cartItem, user.uid, 1);
      addToast(`${product.productName} 상품이 장바구니에 담겼습니다.`, "success");
    } else {
      navigate(pageRoutes.login);
    }
  };

  const handlePurchaseAction = (product: IProduct): void => {
    if (isLogin && user) {
      const cartItem: CartItem = { ...product, count: 1 };
      addCartItem(cartItem, user.uid, 1);
    } else {
      navigate(pageRoutes.login);
    }
  };

  const handlePrefetchProducts = async (categoryId: string) => {
    const queryKey = [PRODUCT_KEY, { categoryId }];
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

  const getDisplayCount = (settings: CategorySettingsType): number => {
    if (windowWidth >= 1536 && settings.count['2xl']) return settings.count['2xl'];
    if (windowWidth >= 1280 && settings.count.xl) return settings.count.xl;
    if (windowWidth >= 1024) return settings.count.lg;
    if (windowWidth >= 768) return settings.count.md;
    if (windowWidth >= 640) return settings.count.sm;
    return settings.count.xs;
  };

  return (
    <section className="w-full">
      {isLoading ? (
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : Object.keys(groupedProducts).length === 0 ? (
        <EmptyProduct />
      ) : (
        Object.entries(groupedProducts)
          .sort(([a], [b]) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)) 
          .map(([category, items]) => {
            const settings = categoryDisplaySettings[category] || {
              count: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
              gridCols: "grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
            };

            return (
              <div key={category} className="overflow-hidden">
                <div className="flex justify-between items-center mt-6">
                  <h3 className="text-3xl mb-3 font-bold tracking-wide">{category}</h3>
                  <Link
                    to={`${pageRoutes.product}?category=${items[0].productCategory.name}`}
                    onMouseEnter={() => handlePrefetchProducts(items[0].productCategory.id)}
                    className="text-lg font-semibold text-blue-500 hover:text-blue-700"
                  >
                    더보기
                  </Link>
                </div>
                <div className={`grid gap-4 ${settings.gridCols} mb-5`}>
                  {items.slice(0, getDisplayCount(settings)).map((product) => (
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
            );
          })
      )}
    </section>
  );
};
