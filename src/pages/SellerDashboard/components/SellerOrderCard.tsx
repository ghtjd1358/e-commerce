import { TableCell, TableRow } from "@/pages/common/ui/table";
import { OrderType } from "@/features/order/types";
// import { Button } from "@/pages/common/ui/button";
// import { useBuyerCancelOrder } from "@/features/order/hooks/useBuyerCancelOrder";

interface BuyerProductCardProps {
  product: Partial<OrderType> | null;
}

export const SellerOrderCard: React.FC<BuyerProductCardProps> = ({
  product,
}) => {
  if (!product) {
    return null;
  }

  const formattedDate = product.updatedAt?.toString().slice(0, 10) ?? "";

  return (
    <TableRow key={product.id}>
      <TableCell className="text-gray-400 w-1/4 overflow-hidden overflow-ellipsis text-center">
        {product.productId}
      </TableCell>
      <TableCell className="text-gray-400 w-1/4 overflow-hidden overflow-ellipsis text-center">
        {product.productName}
      </TableCell>
      <TableCell className="w-1/6 text-center">
        <img
          className="w-20 h-20 object-cover m-auto"
          src={product.productImage}
          alt={product.productImage}
        />
      </TableCell>
      <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis text-center">
        {product.productQuantity} 개
      </TableCell>
      <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis text-center">
        {product.status}
      </TableCell>
      <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
        {formattedDate}
      </TableCell>
      {/* <TableCell className="cursor-pointer">
        <Button onClick={() => handleCancelOrderApi(product.id)}>
          {product.status === "주문 취소" ? "재구매" : "구매 취소"}
        </Button>
      </TableCell> */}
    </TableRow>
  );
};
