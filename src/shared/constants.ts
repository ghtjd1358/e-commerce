import All from "../../public/logo/glock-2424292_640_webp.webp";
import beretta from "../../public/logo/Bretta.svg";
import bondarms from "../../public/logo/bondarms_webp.webp";
import brwoing from "../../public/logo/brwoing_webp.webp";
import czgunz from "../../public/logo/cz-gunz_webp.webp";
import colt from "../../public/logo/Colt-Logo_webp.webp";
import animal from "../../public/animal-17760_1280_webp.webp";
import soldier from "../../public/gun-1927664_1280_webp.webp";
import woman from "../../public/woman-6567047_1280_webp.webp";
import whiskey from "../../public/whiskey-4939956_1280_webp.webp";

export const MAX_CART_VALUE = 999;

export const ALL_CATEGORY_ID = "All";

export const PRODUCT_PAGE_SIZE = 20;

export const categories: { id: string; name: string; img?: string }[] = [
  { id: ALL_CATEGORY_ID, name: "전체", img: All },
  { id: "1", name: "Beretta", img: beretta },
  { id: "2", name: "Bond Arms", img: bondarms },
  { id: "3", name: "Browning", img: brwoing },
  { id: "4", name: "CZ Guns", img: czgunz },
  { id: "5", name: "Colt", img: colt },
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

export const heroSlides = [
  { image: soldier, alt: "전체 상품", title: "당신의 필요에 맞는 총기를 다양한 브랜드를 통해 찾아보세요" },
  { image: woman, alt: "Designer Handbag", title: "Iconic Style" },
  { image: whiskey, alt: "Premium Jewelry", title: "Radiant Beauty" },
  { image: animal, alt: "Animal", title: "Beautiful Nature" },
];
