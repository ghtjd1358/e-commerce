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
import { SellerOrderCard } from "./SellerOrderCard";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useSellerOrders } from "@/features/order/hooks/useFetchSellerOrders";
import { useFetchProducts } from "@/features/products/hooks/useFetchProducts";
import { SellerProductCardSkeleton } from "@/pages/common/components/skeletons/SellerProductCardSkeleton";
import { EmptyProduct } from "@/pages/common/components/EmptyProduct";

interface Order {
  id: string;
  buyerId: string;
  productId: string;
}

export const SellerOrderList: React.FC = () => {
  const { user } = useAuthStore();
  const { data: products } = useFetchProducts();
  const { data: orders, isLoading } = useSellerOrders(user?.uid ?? "") as {
    data: Order[] | undefined;
    isLoading: boolean;
  };

  const ordersMerge = orders?.map((order) => {
    const product = products?.find((item) => item.id === order.productId);
    return {
      ...order,
      productName: product?.productName,
      productImage: product?.productImage[0],
    };
  });

  return (
    <div className="w-full">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex justify-between mb-4">
            <CardTitle className="text-yellow-500 mb-5">주문 목록</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    아이디
                  </TableHead>
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
                    상태
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    날짜
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    상태선택
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }, (_, index) => (
                  <SellerProductCardSkeleton key={index} />
                ))}
              </TableBody>
            </Table>
          ) : ordersMerge && ordersMerge.length > 0 ? (
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    아이디
                  </TableHead>
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
                    상태
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    날짜
                  </TableHead>
                  <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 text-center">
                    상태선택
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordersMerge.map((order) => (
                  <SellerOrderCard key={order.id} product={order} />
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
