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
import { ProductDetailCart } from "./components/ProductDetailCart";
import { useDetailFetchProducts } from "@/features/products/hooks/useDetailFetchProducts";
import { ProductDetailSkeleton } from "./components/skeleton/ProductDetailSkeleton";
import { useModalContext } from "@/shared/hooks/useModalContext";
import { ProductDetailCommend } from "./components/ProductDetailCommend";
import { useFetchProducts } from "@/features/products/hooks/useFetchProducts";

export const ProductDetaiPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useDetailFetchProducts(productId);
  const { isLogin, user } = useAuthStore();
  const [quantity, setQuantity] = useState(1);
  const { addToast } = useToastStore();
  const { addCartItem } = useCartStore();
  const { openModal } = useModalContext();

  // 모든 상품 데이터 가져오기
  const { data: allProducts = [] } = useFetchProducts();

  // 현재 상품과 동일한 카테고리의 추천 상품 필터링
  const recommendations = allProducts.filter(
    (item) =>
      item.productCategory.id === product?.productCategory.id &&
      item.id !== product?.id // 현재 상품 제외
  );

  const handleCartAction = (product: IProduct, e: React.MouseEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    if (isLogin && user) {
      const cartItem: CartItem = { ...product, count: quantity };
      addCartItem(cartItem, user?.uid, quantity);
      addToast(
        `${product.productName} 상품이 장바구니에 담겼습니다.`,
        "success"
      );
    } else {
      navigate(pageRoutes.login);
    }
  };

  const handlePurchaseAction = (
    product: IProduct,
    e: React.MouseEvent
  ): void => {
    e.stopPropagation();
    e.preventDefault();

    if (isLogin && user) {
      const cartItem: CartItem = { ...product, count: quantity };
      addCartItem(cartItem, user.uid, quantity);
      openModal();
    } else {
      navigate(pageRoutes.login);
    }
  };

  if (isLoading) {
    return (
      <Layout authStatus={authStatusType.COMMON}>
        <div className="min-h-screen bg-gray-white text-gray-black p-[30px] pt-[50px]">
          <ProductDetailSkeleton />
        </div>
      </Layout>

    );
  }

  if (error || !product) return <p>Product not found</p>;

  return (
    <Layout authStatus={authStatusType.COMMON}>
      <div className="bg-gray-50 text-gray-800 pt-32">
        <div className="max-w-screen-xl mx-auto space-y-8">
          {/* 상세 정보 */}
          <ProductDetailInfo
            findProducts={product}
            quantity={quantity}
            setQuantity={setQuantity}
            handlePurchaseAction={handlePurchaseAction}
            handleCartAction={handleCartAction}
          />

          {/* 추천 상품 */}
          <div>
            <ProductDetailCommend recommendations={recommendations} />
          </div>

          {/* 고정된 하단 섹션 */}
          <div>
            <ProductDetailCart
              findProducts={product}
              quantity={quantity}
              setQuantity={setQuantity}
              handlePurchaseAction={handlePurchaseAction}
              handleCartAction={handleCartAction}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
