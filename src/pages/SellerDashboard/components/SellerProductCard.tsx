import React, { Suspense } from "react";
import { IProduct } from "@/features/products/type";
import { useToastStore } from "@/store/toast/useToastStore";
import { useModal } from "@/shared/hooks/useModals";
import { Edit, Trash2 } from "lucide-react";
import { useDeleteProducts } from "@/features/products/hooks/useDeleteProducts";
import { ProductUpdaterModal } from "./ProductUpdaterModal";
import { TableCell, TableRow } from "@/pages/common/ui/table";

interface ProductCardProps {
  product: IProduct;
  user: { uid: string } | null;
}

export const SellerProductCard: React.FC<ProductCardProps> = ({
  product,
  user,
}) => {
  const { addToast } = useToastStore();
  const { mutateAsync } = useDeleteProducts();
  const { isOpen, openModal, closeModal } = useModal();

  const handleDeleteProduct = async () => {
    if (product.sellerId !== user?.uid) {
      addToast("삭제 권한이 없습니다.", "error");
      return;
    }

    try {
      await mutateAsync(product.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TableRow key={product.id}>
        <TableCell className="text-gray-400 w-1/6 text-center">
          {product.id}
        </TableCell>
        <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-normal text-center">
          {product.productName}
        </TableCell>
        <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
          $ {product.productPrice}
        </TableCell>
        <TableCell className="text-gray-400 w-1/5 overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
          {product.productQuantity} 개
        </TableCell>
        <TableCell className="w-1/5 text-center">
          <img
            src={product.productImage[0]}
            alt={product.productName}
            className="w-16 h-16 object-cover m-auto"
          />
        </TableCell>
        <TableCell className="font-medium text-gray-400 w-1/4 overflow-hidden overflow-ellipsis whitespace-normal text-center">
          {product.updatedAt.slice(0, 10)}
        </TableCell>
        <TableCell className=" cursor-pointer">
          {product.sellerId === user?.uid && (
            <>
              <Edit onClick={openModal} />
              <Trash2 onClick={handleDeleteProduct} />
            </>
          )}
        </TableCell>
      </TableRow>

      <Suspense fallback={<div>Loading...</div>}>
        {isOpen && (
          <ProductUpdaterModal
            isOpen={isOpen}
            onClose={closeModal}
            product={product}
          />
        )}
      </Suspense>
    </>
  );
};
