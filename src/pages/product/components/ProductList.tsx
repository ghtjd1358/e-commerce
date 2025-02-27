import React, { useEffect } from "react";
import { IProduct } from "@/features/products/type";
import { ProductCard } from "@/pages/common/components/Card/ProductCard";
import { CartItem } from "@/store/cart/type";
import { pageRoutes } from "@/app/apiRouters";
import { useToastStore } from "@/store/toast/useToastStore";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cart/useCartStore";
import { GoogleUser, IUser } from "@/features/auth/types";
import { ProductCardSkeleton } from "@/pages/home/components/MainProductListSkeleton";
import { EmptyProduct } from "@/pages/common/components/EmptyProduct";
import { useInView } from "react-intersection-observer";
import { Button } from "@/pages/common/ui/button";

interface ProductListProps {
  filteredProducts: IProduct[];
  isLogin: boolean;
  user: IUser | GoogleUser | null;
  isLoading: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  filteredProducts,
  isLogin,
  user,
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetching,
}) => {
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const { cart, addCartItem } = useCartStore();
  const cartItemCount = cart.map((item) => item.id);

  // Intersection Observer로 무한 스크롤 구현
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // 장바구니 추가 액션
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

  // 구매 액션
  const handlePurchaseAction = (product: IProduct): void => {
    if (isLogin && user) {
      const cartItem: CartItem = { ...product, count: 1 };
      addCartItem(cartItem, user.uid, 1);
    } else {
      navigate(pageRoutes.login);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* 로딩 상태 */}
      {isLoading ? (
        <>
          {[...Array(20)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </>
      ) : filteredProducts.length > 0 ? (
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
        <EmptyProduct />
      )}

      {/* 무한 스크롤 버튼 */}
      {hasNextPage && (
        <div ref={ref} className="flex justify-center items-center col-span-full">
          <Button variant="outline" className="w-full bg-gray-700">
            {isFetching ? "...로딩중" : "더 불러오기"}
          </Button>
        </div>
      )}
    </div>
  );
};
