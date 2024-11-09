import { TableCell, TableRow } from "@/pages/common/ui/table";
import { OrderType } from "@/features/order/types";
import { Button } from "@/pages/common/ui/button";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/pages/common/ui/select";
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
    try {
      if (product?.id) {
        await mutateAsync({ orderId: product.id, newStatus: selectedStatus });
      }
    } catch (error) {
      console.log("주문 상태 변경 실패:", error);
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
          className="w-20 h-20 object-cover m-auto"
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
      <TableCell className="cursor-pointer gap-y-1 w-1/7">
        <Select
          value={selectedStatus}
          onValueChange={(value) => setSelectedStatus(value as OrderStatus)}
        >
          <SelectTrigger className="text-center bg-gray-800 text-gray-500 p-2 rounded-md">
            <SelectValue placeholder="상태 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={orderType.ORDER_COMPLETE}>
              {orderType.ORDER_COMPLETE}
            </SelectItem>
            <SelectItem value={orderType.PAYLOAD_PENDING}>
              {orderType.PAYLOAD_PENDING}
            </SelectItem>
            <SelectItem value={orderType.PAYMENT_PENDING}>
              {orderType.PAYMENT_PENDING}
            </SelectItem>
            <SelectItem value={orderType.PAYLOAD_START}>
              {orderType.PAYLOAD_START}
            </SelectItem>
            <SelectItem value={orderType.ORDER_CANCEL}>
              {orderType.ORDER_CANCEL}
            </SelectItem>
          </SelectContent>
        </Select>
        <Button className="mt-3" onClick={handleUpdateOrder}>
          상태변경
        </Button>
      </TableCell>
    </TableRow>
  );
};
