import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";

// import { ProductFilter } from "./ProductFilter";

export const ProducProfiletList = () => {
  return (
    <Card className="bg-gray-800">
      <CardHeader>
        {/* <ProductFilter /> */}
        <CardTitle>구매목록</CardTitle>
      </CardHeader>

      <CardContent>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
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
              <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/5">
                팬매자
              </TableHead>
              <TableHead className="text-gray-100 sticky top-0 bg-gray-800 z-10 w-1/4">
                날짜
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody></TableBody>
        </Table>

        {/* {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              variant="link"
              className="text-white"
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading more..." : "추가 페이지"}
            </Button>
          )} */}
      </CardContent>
    </Card>
  );
};
