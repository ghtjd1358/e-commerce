import { create } from "zustand";
import {
  calculateTotal,
  getCartFromLocalStorage,
  resetCartAtLocalStorage,
  setCartToLocalStorage,
} from "./cartUtils";
import { CartItem, CartStore } from "./type";

export const useCartStore = create<CartStore>((set) => ({
  cart: [] as CartItem[],
  totalCount: 0,
  totalPrice: 0,

  // initCart: 사용자 아이디를 기준으로 장바구니를 로드하고 초기화하는 함수
  initCart: (userId: string) => {
    if (!userId) return;

    const prevCartItems = getCartFromLocalStorage(userId);

    const total = calculateTotal(prevCartItems);

    set({
      cart: prevCartItems,
      totalCount: total.totalCount,
      totalPrice: total.totalPrice,
    });
  },

  // resetCart: 장바구니를 비우고 로컬 저장소에서도 초기화
  resetCart: (userId: string) => {
    resetCartAtLocalStorage(userId);

    set({
      cart: [],
      totalCount: 0,
      totalPrice: 0,
    });
  },

  // addCartItem: 새 항목을 추가하거나 기존 항목의 개수를 늘리는 함수
  addCartItem: (item: CartItem, userId: string, count: number) => {
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === item.id,
      );

      console.log("인덱스 반환", existingItemIndex);
      let updatedCart: CartItem[];

      if (existingItemIndex !== -1) {
        updatedCart = state.cart.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, count: cartItem.count + count }
            : cartItem,
        );
      } else {
        // 새로운 아이템이면 장바구니에 추가
        updatedCart = [...state.cart, { ...item, count }];
      }

      const total = calculateTotal(updatedCart);
      setCartToLocalStorage(updatedCart, userId);

      return {
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },

  // removeCartItem: 장바구니에서 항목 제거하는 함수
  removeCartItem: (itemId: string, userId: string) => {
    set((state) => {
      // 특정 항목을 제외한 새 장바구니 생성
      const updatedCart = state.cart.filter(
        (cartItem) => cartItem.id !== itemId,
      );

      const total = calculateTotal(updatedCart);
      setCartToLocalStorage(updatedCart, userId);

      return {
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },

  // changeCartItemCount: 장바구니 항목의 수량 변경
  changeCartItemCount: ({
    itemId,
    count,
    userId,
  }: {
    itemId: string;
    count: number;
    userId: string;
  }) => {
    set((state) => {
      // 각 아이템의 ID를 비교하고, 일치하는 경우에만 수량(count)을 업데이트
      const updatedCart = state.cart.map((cartItem) => {
        // console.log("변경할 아이템 ID:", cartItem.id);
        // console.log("전달된 아이템 ID:", itemId);
        // console.log("현재 수량:", cartItem.count);
        // console.log("새로운 수량:", count);

        // 아이템 ID가 일치하면 수량을 변경한 새 객체 반환
        if (cartItem.id === itemId) {
          return { ...cartItem, count };
        }
        // 일치하지 않는 경우 기존 객체 반환
        return cartItem;
      });

      const total = calculateTotal(updatedCart);
      setCartToLocalStorage(updatedCart, userId);

      return {
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },
}));
