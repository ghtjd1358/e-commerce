import { OrderType } from "@/features/order/types";
import { TableCell, TableRow } from "@/pages/common/ui/table";

interface ProductOrderListProps {
  productOrder: OrderType[];
}

export const ProductOrderList: React.FC<ProductOrderListProps> = ({
  productOrder,
}) => {
  return (
    <>
      {productOrder.map((order) => (
        <TableRow key={order.id}>
          <TableCell className="text-gray-400 w-1/4 overflow-hidden overflow-ellipsis whitespace-normal">
            {order.id}
          </TableCell>
          <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-nowrap">
            $ {order.status}
          </TableCell>
          <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-nowrap">
            {order.productQuantity} 개
          </TableCell>
          {/* <TableCell className="w-1/5">
            <img
              src={product.productImage[0]}
              alt={product.productName}
              className="w-16 h-16 object-cover"
            />
          </TableCell> */}
          {/* <TableCell className="font-medium text-gray-400 w-1/4 overflow-hidden overflow-ellipsis whitespace-normal">
            {order.updatedAt.slice(0, 10)}
          </TableCell> */}
        </TableRow>
      ))}
    </>
  );
};
