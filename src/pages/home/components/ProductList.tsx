import React from "react";
import { ProductCard } from "../../common/components/ProductCard";
import { IProduct } from "@/lib/products/type";
import { Link, useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRouters";
import { useFetchProducts } from "@/lib/products/hooks/useFetchProducts";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useToastStore } from "@/store/toast/useToastStore";
import { useCartStore } from "@/store/cart/useCartStore";
import { CartItem } from "@/store/cart/type";

export const ProductList: React.FC = () => {
  const { data } = useFetchProducts();
  const { user, isLogin } = useAuthStore();
  const { addToast } = useToastStore();
  const { cart, addCartItem } = useCartStore();
  const navigate = useNavigate();

  const cartItem = cart.map((item) => item.id);

  const groupedProducts = data?.reduce(
    (acc, product) => {
      const category = product.productCategory.name;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    },
    {} as Record<string, IProduct[]>,
  );

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
      navigate(pageRoutes.cart);
    } else {
      navigate(pageRoutes.login);
    }
  };

  return (
    <main>
      <section className="mt-12 p-10">
        {groupedProducts &&
          Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="mb-12">
              <div className="flex justify-between">
                <h3 className="text-3xl font-bold">{category}</h3>
                <Link
                  to={`${pageRoutes.cfproduct}/${items[0].productCategory.id}`}
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
          ))}
      </section>
    </main>
  );
};
