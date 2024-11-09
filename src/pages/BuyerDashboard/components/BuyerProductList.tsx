import { OrderType } from "@/features/order/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/pages/common/ui/table";
import { BuyerProductCard } from "./BuyerProductCard";
import { SellerProductCardSkeleton } from "@/pages/common/components/skeletons/SellerProductCardSkeleton";
import { EmptyProduct } from "@/pages/common/components/EmptyProduct";
import { useFetchProducts } from "@/features/products/hooks/useFetchProducts";
import { useBuyerOrders } from "@/features/order/hooks/useFetchOrders";

interface ProductOrderListProps {
  buyerId: string;
}

interface Order {
  id: string;
  buyerId: string;
  productId: string;
}

export const BuyerProductList: React.FC<ProductOrderListProps> = ({
  buyerId,
}) => {
  const { data: products } = useFetchProducts();
  const { data: orders, isLoading: ordersLoading } = useBuyerOrders(
    buyerId,
  ) as {
    data: Order[] | undefined;
    isLoading: boolean;
  };

  const buyerProductsMerge: (Partial<OrderType> | null)[] = (orders ?? [])
    .filter((order) => order.buyerId === buyerId)
    .map((order) => {
      const product = products?.find((item) => item.id === order.productId);
      if (!product) {
        return null;
      }
      return {
        ...order,
        productName: product.productName ?? "",
        productImage: product.productImage?.[0] ?? "",
      };
    });

  return (
    <div className="w-full">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex justify-between mb-4">
            <CardTitle className="text-yellow-500 mb-5">구매 목록</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          {ordersLoading ? (
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    제품
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    이미지
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    수량
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    판매자
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    상태
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/2 text-center">
                    날짜
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Array.from({ length: 5 }, (_, index) => (
                  <SellerProductCardSkeleton key={index} />
                ))}
              </TableBody>
            </Table>
          ) : buyerProductsMerge.length > 0 ? (
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    제품
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    이미지
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    수량
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    판매자
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    상태
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/2 text-center">
                    날짜
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {buyerProductsMerge.map((product) => (
                  <BuyerProductCard key={product?.id} product={product} />
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyProduct />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
