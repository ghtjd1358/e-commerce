import { TableCell, TableRow } from "@/pages/common/ui/table";
import { OrderType } from "@/features/order/types";
import { Button } from "@/pages/common/ui/button";
import { useState } from "react";
import { orderType } from "@/shared/constants";
import { OrderStatus } from "@/features/order/types";
import { useUpdateOrderStatus } from "@/features/order/hooks/useUpdateSellerOrders";

interface BuyerProductCardProps {
  product: Partial<OrderType> | null;
}

export const SellerOrderCard: React.FC<BuyerProductCardProps> = ({
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
    <TableRow key={product.id}>
      <TableCell className="text-gray-400 w-1/7 overflow-hidden overflow-ellipsis text-center">
        {product.productId}
      </TableCell>
      <TableCell className="text-gray-400 w-1/7 overflow-hidden overflow-ellipsis text-center">
        {product.productName}
      </TableCell>
      <TableCell className="w-1/7 text-center">
        <img
          className="w-20 h-20 object-contain m-auto"
          src={product.productImage}
          alt={product.productName}
        />
      </TableCell>
      <TableCell className="text-gray-400 w-1/6 overflow-hidden overflow-ellipsis text-center">
        {product.productQuantity} 개
      </TableCell>
      <TableCell className="text-gray-400 w-1/6 overflow-hidden overflow-ellipsis text-center">
        {product.status}
      </TableCell>
      <TableCell className="text-gray-400 w-1/6 overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
        {formattedDate}
      </TableCell>
      <TableCell className="cursor-pointer w-1/7 flex flex-col">
        <select
          className=" border-gray-600 rounded-md py-2 bg-gray-900 text-gray-300 shadow-sm text-center"
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value as OrderStatus)}
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
        <Button className="mt-3" onClick={handleUpdateOrder}>
          상태변경
        </Button>
      </TableCell>
    </TableRow>
  );
};
