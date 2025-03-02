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

export const ProductDetaiPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useDetailFetchProducts(productId);
  const { isLogin, user } = useAuthStore();
  const [quantity, setQuantity] = useState(1);
  const { addToast } = useToastStore();
  const { addCartItem } = useCartStore();
  const { openModal } = useModalContext();

  // 예제 추천 상품 데이터 (실제 데이터는 API 호출로 대체 가능)
  const recommendedProducts = [
    {
      id: "1",
      productName: "추천 상품 1",
      productPrice: 15000,
      productImage: ["/images/product1.jpg"],
      productAuthorName: "저자 A",
      productPublisher: "출판사 A",
      productCategory: { id : '1' ,name: "카테고리 A" },
    },
    {
      id: "2",
      productName: "추천 상품 2",
      productPrice: 20000,
      productImage: ["/images/product2.jpg"],
      productAuthorName: "저자 B",
      productPublisher: "출판사 B",
      productCategory: { id : '2', name: "카테고리 B" },
    },
    // 더 많은 추천 상품 추가 가능
  ];

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
          <ProductDetailCommend recommendations={recommendedProducts} />
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
