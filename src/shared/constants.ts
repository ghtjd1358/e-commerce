import All from "../../public/logo/glock-2424292_640_webp.webp";
import beretta from "../../public/logo/Bretta.svg";
import bondarms from "../../public/logo/bondarms_webp.webp";
import brwoing from "../../public/logo/brwoing_webp.webp";
import czgunz from "../../public/logo/cz-gunz_webp.webp";

export const MAX_CART_VALUE = 999;

export const ALL_CATEGORY_ID = "All";

export const PRODUCT_PAGE_SIZE = 20;

export const categories: { id: string; name: string; img?: string }[] = [
  { id: ALL_CATEGORY_ID, name: ALL_CATEGORY_ID, img: All },
  { id: "1", name: "국내도서", img: beretta },
  { id: `2`, name: "해외도서", img: bondarms },
  { id: "3", name: "eBook", img: brwoing },
  { id: "4", name: "sam", img: czgunz },
];

export const authStatusType = {
  NEED_LOGIN: "NEED_LOGIN",
  NEED_NOT_LOGIN: "NEED_NOT_LOGIN",
  IS_SELLER: "IS_SELLER",
  IS_BUYER: "IS_BUYER",
  COMMON: "COMMON",
};

export const orderType = {
  ORDER_COMPLETE: "주문 완료",
  ORDER_CANCEL: "주문 취소",
  PAYMENT_PENDING: "결제 대기",
  PAYLOAD_PENDING: "발송 대기",
  PAYLOAD_START: "발송 시작",
};


