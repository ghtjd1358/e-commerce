export const MAX_CART_VALUE = 999;

export const ALL_CATEGORY_ID = "All";

export const PRODUCT_PAGE_SIZE = 20;

export const categories: { id: string; name: string; }[] = [
  { id: ALL_CATEGORY_ID, name: ALL_CATEGORY_ID },
  { id: "1", name: "국내도서" },
  { id: "2", name: "해외도서" },
  { id: "3", name: "eBook" },
  { id: "4", name: "sam" },
  { id: "5", name: "핫트랙스" }
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

export const categoryDisplaySettings = {
  "국내도서": { 
    count: { xs: 1, sm: 2, md: 3, lg: 4 }, 
    gridCols: "grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
  },
  "해외도서": { 
    count: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }, 
    gridCols: "grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" 
  },
  "eBook": { 
    count: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }, 
    gridCols: "grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" 
  },
  "sam": { 
    count: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, '2xl': 6 }, 
    gridCols: "grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6" 
  },
  "핫트랙스": { 
    count: { xs: 1, sm: 2, md: 3, lg: 4, xl: 6, '2xl': 7 }, 
    gridCols: "grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7" 
  }
};

export const categoryOrder = ["국내도서", "해외도서", "eBook", "sam", "핫트랙스"];