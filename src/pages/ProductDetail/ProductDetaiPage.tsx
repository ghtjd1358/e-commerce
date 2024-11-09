import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authStatusType } from "@/shared/constants";
import { IProduct } from "@/features/products/type";
import { CartItem } from "@/store/cart/type";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useToastStore } from "@/store/toast/useToastStore";
import { pageRoutes } from "@/app/apiRouters";
import { useCartStore } from "@/store/cart/useCartStore";
import { useFetchProducts } from "@/features/products/hooks/useFetchProducts";
import { Layout } from "../common/components/Layout";
import { ProductDetailReview } from "./ProductDetailReview";
import { ProductDetailInfo } from "./ProductDetailInfo";

interface ProductListProps {
  pageSize?: number;
}

export const ProductDetaiPage: React.FC<ProductListProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useFetchProducts();
  const findProducts = data?.find((item) => item.id === String(id));
  const { isLogin, user } = useAuthStore();
  const [quantity, setQuantity] = useState(1);
  const { addToast } = useToastStore();
  const { addCartItem } = useCartStore();

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
      navigate(pageRoutes.shoppingcart);
    } else {
      navigate(pageRoutes.login);
    }
  };

  if (!findProducts) return <p>Product not found</p>;

  return (
    <Layout authStatus={authStatusType.COMMON}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-14 pt-32">
        <div className="max-w-6xl mx-auto space-y-8">
          <ProductDetailInfo
            findProducts={findProducts}
            quantity={quantity}
            setQuantity={setQuantity}
            handlePurchaseAction={handlePurchaseAction}
            handleCartAction={handleCartAction}
          />
          <ProductDetailReview findProducts={findProducts} />
        </div>
      </div>
    </Layout>
  );
};
