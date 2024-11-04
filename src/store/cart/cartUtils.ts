import { getItem, setItem } from "@/shared/helpers/localStorage";
import { parseJSON } from "@/shared/utils/common";
import { CartItem, Total } from "./type";

const CART_LOCAL_STORAGE_KEY = "CART_LOCAL_STORAGE_KEY";

// 로컬스토리지에 담긴 상품 불러오기
export const getCartFromLocalStorage = (userId: string): CartItem[] => {
  const cartData = getItem(CART_LOCAL_STORAGE_KEY);
  if (!cartData) {
    return [];
  }

  const cartItems = parseJSON(cartData) as Record<string, CartItem[]> | null;
  return cartItems?.[userId] ?? [];
};

// 로컬스토리지에 담긴 상품 초기화
export const resetCartAtLocalStorage = (userId: string): void => {
  const cartData = getItem(CART_LOCAL_STORAGE_KEY);
  const cartItems = cartData
    ? (parseJSON(cartData) as Record<string, CartItem[]>)
    : {};

  setItem(CART_LOCAL_STORAGE_KEY, {
    ...cartItems,
    [userId]: [],
  });
};

// 로컬스토리지에 상품 담기기
export const setCartToLocalStorage = (
  cart: CartItem[],
  userId: string,
): void => {
  const cartData = getItem(CART_LOCAL_STORAGE_KEY);
  const cartItems = cartData
    ? (parseJSON(cartData) as Record<string, CartItem[]>)
    : {};

  console.log("Saving cart to local storage:", {
    ...cartItems,
    [userId]: cart,
  });

  setItem(CART_LOCAL_STORAGE_KEY, {
    ...cartItems,
    [userId]: cart,
  });
};

// 계산기
export const calculateTotal = (cart: CartItem[]): Total => {
  return cart.reduce(
    (acc: Total, item: CartItem) => ({
      totalCount: acc.totalCount + item.count,
      totalPrice: acc.totalPrice + item.productPrice * item.count,
    }),
    { totalCount: 0, totalPrice: 0 },
  );
};
