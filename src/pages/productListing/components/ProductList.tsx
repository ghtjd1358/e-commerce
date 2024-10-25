import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModal } from "@/hooks/useModals";
import { useFetchProducts } from "@/lib/products/hooks/useFetchProducts";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Suspense } from "react";
// import { extractIndexLink, isFirebaseIndexError } from "../../../helpers/error";
// import { FirebaseIndexErrorModal } from "@/pages/error/FirebaseIndexErrorModal";
import { ProductCard } from "./ProductCard";
import { ProductRegistrationModal } from "./ProductRegisterModal";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";

export const ProductList = ({ pageSize = 5 }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { user } = useAuthStore();
  // const [isIndexErrorModalOpen, setIsIndexErrorModalOpen] = useState(false);
  // const [indexLink, setIndexLink] = useState<string | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchProducts({ pageSize });

  // useEffect(() => {
  //   if (error) {
  //     const errorMessage =
  //       error instanceof Error ? error.message : String(error);
  //     if (isFirebaseIndexError(errorMessage)) {
  //       const link = extractIndexLink(errorMessage);
  //       setIndexLink(link);
  //       setIsIndexErrorModalOpen(true);
  //     }
  //   }
  // }, [error]);

  const products = data ? data.pages.flatMap((page) => page.products) : [];

  return (
    <div className="w-full">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex justify-between mb-4">
            <CardTitle className="text-yellow-500">판매 목록</CardTitle>
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
                ) // 판매자일 경우 자신의 상품만 표시
                .map((product) => (
                  <ProductCard user={user} key={product.id} product={product} />
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

      {/* <FirebaseIndexErrorModal
        isOpen={isIndexErrorModalOpen}
        onClose={() => setIsIndexErrorModalOpen(false)}
        indexLink={indexLink}
      /> */}
    </div>
  );
};
