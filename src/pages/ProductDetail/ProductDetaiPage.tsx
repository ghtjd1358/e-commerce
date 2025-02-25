import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authStatusType } from "@/shared/constants";
import { IProduct } from "@/features/products/type";
import { CartItem } from "@/store/cart/type";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useToastStore } from "@/store/toast/useToastStore";
import { pageRoutes } from "@/app/apiRouters";
import { useCartStore } from "@/store/cart/useCartStore";
import { Layout } from "../common/components/Layout";
import { ProductDetailInfo } from "./components/ProductDetailInfo";
import { useDetailFetchProducts } from "@/features/products/hooks/useDetailFetchProducts";
import { ProductDetailSkeleton } from "./components/skeleton/ProductDetailSkeleton";
import { useModalContext } from "@/shared/hooks/useModalContext";

export const ProductDetaiPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useDetailFetchProducts(productId);
  const { isLogin, user } = useAuthStore();
  const [quantity, setQuantity] = useState(1);
  const { addToast } = useToastStore();
  const { addCartItem } = useCartStore();
  const { openModal } = useModalContext()

  const handleCartAction = (product: IProduct, e: React.MouseEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    if (isLogin && user) {
      const cartItem: CartItem = { ...product, count: quantity };
      addCartItem(cartItem, user?.uid, quantity);
      addToast(
        `${product.productName} 상품이 장바구니에 담겼습니다.`,
        "success",
      );
    } else {
      navigate(pageRoutes.login);
    }
  };

  const handlePurchaseAction = (
    product: IProduct,
    e: React.MouseEvent,
  ): void => {
    e.stopPropagation();
    e.preventDefault();


    if (isLogin && user) {
      const cartItem: CartItem = { ...product, count: quantity };
      addCartItem(cartItem, user.uid, quantity);
      openModal()
    } else {
      navigate(pageRoutes.login);
    }
  };

  if (isLoading) {
    return (
      <Layout authStatus={authStatusType.COMMON}>
        <div className="min-h-screen bg-gray-900 text-gray-100 p-14 pt-32">
          <div className="max-w-6xl mx-auto space-y-8">
            <ProductDetailSkeleton />
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !product) return <p>Product not found</p>;

  return (
    <Layout authStatus={authStatusType.COMMON}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-14 pt-32">
        <div className="max-w-6xl mx-auto space-y-8">
          <ProductDetailInfo
            findProducts={product}
            quantity={quantity}
            setQuantity={setQuantity}
            handlePurchaseAction={handlePurchaseAction}
            handleCartAction={handleCartAction}
          />
        </div>
      </div>
    </Layout>
  );
};
