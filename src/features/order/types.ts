// OrderType: 주문 객체의 구조를 정의
export type OrderType = {
  id: string;
  sellerId: string;
  buyerId: string;
  productId: string;
  productQuantity: number;
  productName?: string;
  productImage?: string;
  status:
    | "주문 완료"
    | "발송 대기"
    | "발송 시작"
    | "주문 취소"
    | "결제 대기"
    | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
};

export type GetOrdersForBuyerApiResponse = OrderType[];

export type GetOrdersForSellerApiResponse = OrderType[];

export type UpdateOrderStatusApiParams = {
  orderId: string;
  newStatus: "주문 완료" | "발송 대기" | "발송 시작" | "주문 취소";
};

export enum OrderStatus {
  COMPLETED = "주문 완료",
  PENDING_SHIPMENT = "발송 대기",
  SHIPPED = "발송 시작",
  CANCELLED = "주문 취소",
}
