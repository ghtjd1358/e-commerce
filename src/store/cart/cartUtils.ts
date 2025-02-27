import { getItem, setItem } from "@/shared/helpers/localStorage";
import { parseJSON } from "@/shared/utils/common";
import { CartItem, Total } from "./type";

const CART_LOCAL_STORAGE_KEY = "CART_LOCAL_STORAGE_KEY";

// 로컬스토리지에서 장바구니 불러오기
export const getCartFromLocalStorage = (userId?: string): CartItem[] => {
  const key = userId || "guest"; 
  const cartData = getItem(CART_LOCAL_STORAGE_KEY);
  if (!cartData) {
    return [];
  }

  const cartItems = parseJSON(cartData) as Record<string, CartItem[]> | null;
  return cartItems?.[key] ?? [];
};

// 로컬스토리지에 장바구니 초기화
export const resetCartAtLocalStorage = (userId?: string): void => {
  const key = userId || "guest";
  const cartData = getItem(CART_LOCAL_STORAGE_KEY);
  const cartItems = cartData
    ? (parseJSON(cartData) as Record<string, CartItem[]>)
    : {};

  setItem(CART_LOCAL_STORAGE_KEY, {
    ...cartItems,
    [key]: [],
  });
};

// 로컬스토리지에 장바구니 저장
export const setCartToLocalStorage = (
  cart: CartItem[],
  userId?: string,
): void => {
  const key = userId || "guest";
  const cartData = getItem(CART_LOCAL_STORAGE_KEY);
  const cartItems = cartData
    ? (parseJSON(cartData) as Record<string, CartItem[]>)
    : {};

  setItem(CART_LOCAL_STORAGE_KEY, {
    ...cartItems,
    [key]: cart,
  });
};

// 로그인 시 게스트 장바구니 병합
export const mergeGuestCartWithUserCart = (userId: string): void => {
  const guestCart = getCartFromLocalStorage(); // 게스트 장바구니
  const userCart = getCartFromLocalStorage(userId); // 사용자 장바구니

  // 병합 로직
  const mergedCart = [...userCart];
  guestCart.forEach((guestItem) => {
    const existingIndex = mergedCart.findIndex(
      (item) => item.id === guestItem.id,
    );
    if (existingIndex !== -1) {
      mergedCart[existingIndex].count += guestItem.count;
    } else {
      mergedCart.push(guestItem);
    }
  });

  // 병합된 데이터 저장
  setCartToLocalStorage(mergedCart, userId);
  resetCartAtLocalStorage(); // 게스트 데이터 초기화
};

// 총합 계산기
export const calculateTotal = (cart: CartItem[]): Total => {
  return cart.reduce(
    (acc: Total, item: CartItem) => {
      if (item.isSelected) {
        acc.totalCount += item.count;
        acc.totalPrice += item.productPrice * item.count;
      }
      return acc;
    },
    { totalCount: 0, totalPrice: 0 },
  );
};
