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

interface ProductOrderListProps {
  products: (Partial<OrderType> | null)[];
  isLoading: boolean;
}

export const BuyerProductList: React.FC<ProductOrderListProps> = ({
  products,
  isLoading,
}) => {
  return (
    <div className="w-full">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex justify-between mb-4">
            <CardTitle className="text-yellow-500 mb-5">구매 목록</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
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
          ) : products.length > 0 ? (
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
                {products.map((product) => (
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
