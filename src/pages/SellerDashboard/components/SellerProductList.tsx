import { useModal } from "@/shared/hooks/useModals";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Suspense } from "react";
import { useFetchInfiniteQueryProducts } from "@/features/products/hooks/useFetchInfiniteQueryProducts";
import { Button } from "@/pages/common/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";
import { ProductRegistrationModal } from "@/pages/SellerDashboard/components/ProductRegisterModal";
import { ProductCardSquare } from "@/pages/SellerDashboard/components/ProductCardSquare";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from "@/pages/common/ui/table";
import { SellerProductFilter } from "./SellerProductFilter";

export const SellerProductList = ({ pageSize = 5 }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { user } = useAuthStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchInfiniteQueryProducts({ pageSize });

  const products = data ? data.pages.flatMap((page) => page.products) : [];

  return (
    <div className="w-full">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex justify-between mb-4 ">
            <CardTitle className="text-yellow-500 mb-5">판매 목록</CardTitle>

            {user?.isSeller && (
              <Button
                className=" font-bold"
                variant="outline"
                onClick={openModal}
              >
                상품 등록
              </Button>
            )}
          </div>
          <SellerProductFilter />
        </CardHeader>

        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/6">
                  ID
                </TableHead>
                <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/4">
                  제품
                </TableHead>
                <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/5">
                  가격
                </TableHead>
                <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/5">
                  수량
                </TableHead>
                <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/5">
                  이미지
                </TableHead>
                <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/4">
                  날짜
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products
                .filter((product) =>
                  user?.isSeller ? product.sellerId === user.uid : undefined,
                )
                .map((product) => (
                  <ProductCardSquare
                    user={user}
                    key={product.id}
                    product={product}
                  />
                ))}
            </TableBody>
          </Table>

          {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              variant="link"
              className="text-white"
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading more..." : "추가 페이지"}
            </Button>
          )}
        </CardContent>
      </Card>

      <Suspense fallback={<div>Loading...</div>}>
        {isOpen && (
          <ProductRegistrationModal isOpen={isOpen} onClose={closeModal} />
        )}
      </Suspense>
    </div>
  );
};
