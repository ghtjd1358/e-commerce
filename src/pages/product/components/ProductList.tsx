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
  products: IProduct[];
  isLogin: boolean;
  user: IUser | GoogleUser | null;
  isLoading: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
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

  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "10px"
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {isLoading ? (
        <>
          {[...Array(10)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </>
      ) : products.length > 0 ? (
        products.map((product) => (
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

      {hasNextPage && (
        <div ref={ref} className="w-full flex justify-center items-center col-span-full">
          <Button
            variant="outline"
            className="w-1/2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
            disabled={isFetching}
          >
            {isFetching ? "로딩 중..." : "더 불러오기"}
          </Button>
        </div>
      )}
    </div>
  );
};