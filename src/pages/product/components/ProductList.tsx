import React from "react";
import { IProduct } from "@/features/products/type";
import { ProductCard } from "@/pages/common/components/product/ProductCard";
import { CartItem } from "@/store/cart/type";
import { pageRoutes } from "@/app/apiRouters";
import { useToastStore } from "@/store/toast/useToastStore";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cart/useCartStore";
import { GoogleUser, IUser } from "@/features/auth/types";
import { ProductCardSkeleton } from "@/pages/home/components/MainProductListSkeleton";
import { SellerEmptyProduct } from "@/pages/common/components/SellerEmptyProduct";

interface ProductListProps {
  filteredProducts: IProduct[];
  isLogin: boolean;
  user: IUser | GoogleUser | null;
  isLoading: boolean;
  pageSize: number;
}

export const ProductList: React.FC<ProductListProps> = ({
  filteredProducts,
  isLogin,
  user,
  isLoading,
  pageSize,
}) => {
  console.log("ProductListPage");
  const { addToast } = useToastStore();
  const navigate = useNavigate();

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

  const { cart, addCartItem } = useCartStore();
  const cartItemCount = cart.map((item) => item.id);

  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isLoading ? (
        <>
          {Array.from({ length: pageSize }, (_, index) => (
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
        <SellerEmptyProduct onAddProduct={() => {}} />
      )}
    </div>
  );
};
