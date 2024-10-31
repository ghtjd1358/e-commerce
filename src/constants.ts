import All from "../public/logo/glock-2424292_640.jpg";
import beretta from "../public/logo/Bretta.svg";
import bondarms from "../public/logo/bondarms.jpg";
import brwoing from "../public/logo/brwoing.jpg";
import czgunz from "../public/logo/cz-gunz.jpg";
import colt from "../public/logo/Colt-Logo.jpg";

export const MAX_CART_VALUE = 999;

export const ALL_CATEGORY_ID = "-1";

export const PRODUCT_PAGE_SIZE = 5;

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
