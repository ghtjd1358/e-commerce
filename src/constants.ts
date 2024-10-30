export const MAX_CART_VALUE = 999;

export const ALL_CATEGORY_ID = "-1";

export const PRODUCT_PAGE_SIZE = 5;

export const categories: { id: string; name: string }[] = [
  { id: ALL_CATEGORY_ID, name: "전체" },
  { id: "1", name: "Beretta" },
  { id: "2", name: "Bond Arms" },
  { id: "3", name: "Browning" },
  { id: "4", name: "CZ Guns" },
  { id: "5", name: "Colt" },
];

export const authStatusType = {
  NEED_LOGIN: "NEED_LOGIN",
  NEED_NOT_LOGIN: "NEED_NOT_LOGIN",
  IS_SELLER: "IS_SELLER",
  IS_BUYER: "IS_BUYER",
  COMMON: "COMMON",
};
