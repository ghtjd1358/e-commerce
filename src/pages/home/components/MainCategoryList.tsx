import React from "react";
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

export const MainCategoryList: React.FC = () => {
  const { data, isLoading } = useFetchProducts();
  const { user, isLogin } = useAuthStore();
  const { cart, addCartItem } = useCartStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const cartItem = cart.map((item) => item.id);

  // 카테고리별로 보여줄 상품 개수와 그리드 컬럼 설정
  const categoryDisplaySettings: Record<string, { count: number; gridCols: string }> = {
    "국내도서": { count: 4, gridCols: "grid-cols-4" },
    "해외도서": { count: 5, gridCols: "grid-cols-5" },
    "eBook": { count: 5, gridCols: "grid-cols-5" },
    "sam": { count: 6, gridCols: "grid-cols-6" },
  };

  // 원하는 카테고리 정렬 순서
  const categoryOrder = ["국내도서", "해외도서", "eBook", "sam"];

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
      {} as Record<string, IProduct[]>
    ) || {};

  // 장바구니
  const handleCartAction = (product: IProduct): void => {
    if (isLogin && user) {
      const cartItem: CartItem = { ...product, count: 1 };
      addCartItem(cartItem, user.uid, 1);
      addToast(
        `${product.productName} 상품이 장바구니에 담겼습니다.`,
        "success"
      );
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

  // prefetch
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

  return (
    <section className="w-full">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
              count: 5,
              gridCols: "grid-cols-5",
            };

            return (
              <div key={category} className="overflow-hidden">
                {/* 카테고리 헤더 */}
                <div className="flex justify-between items-center mt-6 mb-2">
                  <h3 className="text-2xl font-bold">{category}</h3>
                  <Link
                    to={`${pageRoutes.product}?category=${items[0].productCategory.name}`}
                    onMouseEnter={() =>
                      handlePrefetchProducts(items[0].productCategory.id)
                    }
                    className="text-lg font-semibold text-blue-500 hover:text-blue-700"
                  >
                    더보기
                  </Link>
                </div>
                {/* 상품 카드 */}
                <div className={`grid gap-4 ${settings.gridCols}`}>
                  {items.slice(0, settings.count).map((product) => (
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
