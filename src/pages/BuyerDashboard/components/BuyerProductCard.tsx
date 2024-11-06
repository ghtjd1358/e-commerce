import { TableCell, TableRow } from "@/pages/common/ui/table";
import { OrderType } from "@/features/order/types";
import { cancelOrderApi } from "@/features/order/api";
import { Button } from "@/pages/common/ui/button";

interface BuyerProductCardProps {
  product: Partial<OrderType> | null;
}

export const BuyerProductCard: React.FC<BuyerProductCardProps> = ({
  product,
}) => {
  if (!product) {
    return null;
  }

  const handleCancelOrderApi = async (orderId) => {
    try {
      cancelOrderApi(orderId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <TableRow key={product.id}>
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
        <TableCell className="text-gray-400 w-1/6">
          {product.sellerId}
        </TableCell>
        <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis text-center">
          {product.status}
        </TableCell>
        {/* <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {product.updatedAt?.}
        </TableCell> */}
        <TableCell className=" cursor-pointer">
          <Button onClick={() => handleCancelOrderApi(product.id)}>
            구매최소
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};
