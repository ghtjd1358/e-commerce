import React, { Suspense } from "react";
import { IProduct } from "@/features/products/type";
import { useToastStore } from "@/store/toast/useToastStore";
import { useModal } from "@/shared/hooks/useModals";
import { Edit, Trash2 } from "lucide-react";
import { useDeleteProducts } from "@/features/products/hooks/useDeleteProducts";
import { ProductUpdaterModal } from "./ProductUpdaterModal";

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
      addToast("상품이 성공적으로 삭제되었습니다.", "success");
    } catch (error) {
      addToast("상품 삭제에 실패했습니다.", "error");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row border rounded-lg shadow-md p-5 bg-white space-y-4 sm:space-y-0 sm:space-x-4">
        {/* 이미지 */}
        <div className="flex justify-center sm:w-1/4">
          <img
            src={product.productImage[0]}
            alt={product.productName}
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* 상품 정보 */}
        <div className="flex flex-col flex-grow">
          {/* 상품명 */}
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-700 text-lg">
              {product.productName}
            </span>
          </div>

          {/* 가격 및 수량 */}
          <div className="flex flex-col mb-5">
            <span className="text-gray-900 font-bold text-lg">
              {product.productPrice.toLocaleString()}
            </span>
            <span className="text-gray-900 font-bold text-lg">
              {product.productQuantity} 개
            </span>
          </div>

          {/* 날짜 */}
          <div className="space-x-2">
            <span className="text-gray-400 font-medium text-xs">
              등록일: {new Date(product.updatedAt).toLocaleDateString("ko-KR")}
            </span>
          </div>
        </div>

        {/* 수정/삭제 버튼 */}
        <div className="flex flex-col justify-evenly items-end sm:w-auto p-2">
          {product.sellerId === user?.uid && (
            <>
              <button
                onClick={openModal}
                className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <Edit className="w-4 h-4" />
                수정
              </button>
              <button
                onClick={handleDeleteProduct}
                className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4" />
                삭제
              </button>
            </>
          )}
        </div>
      </div>

      {/* 수정 모달 */}
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
