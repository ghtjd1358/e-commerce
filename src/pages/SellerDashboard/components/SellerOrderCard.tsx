import { OrderType } from "@/features/order/types";
import { Button } from "@/pages/common/ui/button";
import { useState } from "react";
import { orderType } from "@/shared/constants";
import { OrderStatus } from "@/features/order/types";
import { useUpdateOrderStatus } from "@/features/order/hooks/useUpdateSellerOrders";

interface SellerOrderCardProps {
  product: Partial<OrderType> | null;
}

export const SellerOrderCard: React.FC<SellerOrderCardProps> = ({
  product,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    (product?.status as OrderStatus) || orderType.ORDER_COMPLETE,
  );

  const { mutateAsync } = useUpdateOrderStatus();

  const formattedDate = product?.updatedAt?.toString().slice(0, 10) ?? "";

  if (!product) {
    return null;
  }

  const handleUpdateOrder = async () => {
    if (product?.id) {
      await mutateAsync({ orderId: product.id, newStatus: selectedStatus });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row border rounded-lg shadow-md p-5 bg-white space-y-4 sm:space-y-0 sm:space-x-4">
      {/* 이미지 */}
      <div className="flex justify-center sm:w-1/4">
        <img
          src={product.productImage}
          alt={product.productName}
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* 주문 정보 */}
      <div className="flex flex-col flex-grow">
        {/* 상품명 */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700 text-lg">
            {product.productName}
          </span>
        </div>

        {/* 수량 및 상태 */}
        <div className="flex flex-col mb-5">
          <span className="text-gray-900 font-bold text-lg">
            수량: {product.productQuantity} 개
          </span>
          <span className="text-gray-900 font-bold text-lg">
            상태: {product.status}
          </span>
        </div>

        {/* 날짜 */}
        <div className="space-x-2">
          <span className="text-gray-400 font-medium text-xs">
            주문일: {formattedDate}
          </span>
        </div>
      </div>

      {/* 상태 변경 섹션 */}
      <div className="flex flex-col justify-between items-end sm:w-auto space-y-2">
        <select
          className="border border-gray-400 rounded-md py-2 text-black shadow-sm text-center"
          value={selectedStatus}
          onChange={(event) =>
            setSelectedStatus(event.target.value as OrderStatus)
          }
        >
          <option value="">주문 설정</option>
          <option value={orderType.ORDER_COMPLETE}>
            {orderType.ORDER_COMPLETE}
          </option>
          <option value={orderType.PAYLOAD_PENDING}>
            {orderType.PAYLOAD_PENDING}
          </option>
          <option value={orderType.PAYMENT_PENDING}>
            {orderType.PAYMENT_PENDING}
          </option>
          <option value={orderType.PAYLOAD_START}>
            {orderType.PAYLOAD_START}
          </option>
          <option value={orderType.ORDER_CANCEL}>
            {orderType.ORDER_CANCEL}
          </option>
        </select>
        <Button
          className="mt-3 bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleUpdateOrder}
        >
          상태변경
        </Button>
      </div>
    </div>
  );
};
