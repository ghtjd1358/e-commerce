// OrderType: 주문 객체의 구조를 정의
export type OrderType = {
  id: string;
  sellerId: string;
  buyerId: string;
  productId: string;
  productQuantity: number;
  status: "주문 완료" | "발송 대기" | "발송 시작" | "주문 취소";
  createdAt: Date;
  updatedAt: Date;
};

export type GetOrdersForBuyerApiResponse = OrderType[];

export type GetOrdersForSellerApiResponse = OrderType[];

export type UpdateOrderStatusApiParams = {
  orderId: string;
  newStatus: "주문 완료" | "발송 대기" | "발송 시작" | "주문 취소"; // 새로운 주문 상태
};
