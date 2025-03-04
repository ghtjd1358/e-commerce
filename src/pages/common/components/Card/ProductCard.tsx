import React, { memo } from "react";
import { IProduct } from "@/features/products/type";
import { Link } from "react-router-dom";
import { pageRoutes } from "@/app/apiRouters";
import { useQueryClient } from "@tanstack/react-query";
import { fetchDetailProductApi } from "@/features/products/api";
import { PRODUCT_KEY } from "@/features/products/key";
import { useRef } from "react";
import { useModalContext } from "@/shared/hooks/useModalContext";

interface ProductCardProps {
  product: IProduct;
  cart: string[];
  onClickAddCartButton: (
    e: React.MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) => void;
  onClickPurchaseButton: (
    e: React.MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) => void;
}

export const ProductCard: React.FC<ProductCardProps> = memo(
  ({ product, cart, onClickAddCartButton, onClickPurchaseButton }) => {
    const { openModal } = useModalContext();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const queryClient = useQueryClient();

    // 상품 상세 정보를 prefetch
    const handlePrefetchDetail = async (productId: string) => {
      const queryKey = [PRODUCT_KEY, { productId }];
      const cachedData = queryClient.getQueryData(queryKey);
      if (!cachedData) {
        await queryClient.prefetchQuery({
          queryKey,
          queryFn: () => fetchDetailProductApi(productId),
        });
      }
    };

    // 마우스 오버 시 prefetch 실행
    const handleMouseEnter = (productId: string) => {
      timeoutRef.current = setTimeout(() => {
        handlePrefetchDetail(productId);
      }, 1500);
    };

    const handleMouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    // 장바구니 추가 버튼 클릭
    const handleClickAddCartButton = (
      e: React.MouseEvent<HTMLButtonElement>
    ): void => {
      e.preventDefault();
      e.stopPropagation();
      onClickAddCartButton(e, product);
    };

    // 구매 버튼 클릭
    const handleClickPurchaseButton = (
      e: React.MouseEvent<HTMLButtonElement>
    ): void => {
      e.preventDefault();
      e.stopPropagation();
      openModal();
      onClickPurchaseButton(e, product);
    };

    // 장바구니 확인 버튼 클릭
    const handleClickModalButton = (
      e: React.MouseEvent<HTMLButtonElement>
    ): void => {
      e.preventDefault();
      e.stopPropagation();
      openModal();
    };

    const hasCart = cart.includes(product.id);

    // 상품 등록 날짜 계산
    const getDisplayDate = (updatedAt: string): string => {
      const currentDate = new Date();
      const registrationDate = new Date(updatedAt);
      const differenceInDays =
        Math.floor(
          (currentDate.getTime() - registrationDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );

      if (differenceInDays === 0) return "오늘";
      if (differenceInDays === 1) return "1일 전";
      if (differenceInDays <= 7) return `${differenceInDays}일 전`;
      return registrationDate.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return (
      <div
        className="relative overflow-hidden group"
        onMouseEnter={() => handleMouseEnter(product.id)}
        onMouseLeave={handleMouseLeave}
      >
        {/* 상품 품절 상태 처리 */}
        <div className="w-full h-auto">
          <Link to={`${pageRoutes.productDetail}/${product.id}`}>
            <img
              src={product.productImage[0]}
              alt={product.productName}
              className="w-full h-full object-fill border-2 shadow-lg rounded-md"
              style={{  aspectRatio: "3 / 4" }}
            />
            <div className="p-2">
              <div className="flex justify-between items-center text-gray-400">
                <span className="text-sm">{product.productCategory.name}</span>
              </div>
              <h3 className="text-lg font-semibold mt-1 line-clamp-1">
                {product.productName}
              </h3>
              <div className="flex justify-between items-center">
              {/* 작가와 출판사 정보 조건부 렌더링 */}
              {product.productAuthorName || product.productPublisher ? (
                <span className="text-sm text-gray-500 line-clamp-1">
                  {product.productAuthorName && product.productPublisher
                    ? `${product.productAuthorName} · ${product.productPublisher}`
                    : product.productAuthorName || product.productPublisher}
                </span>
              ) : null}
            </div>
            </div>
          </Link>
          {/* 판매 완료 오버레이 */}
          {product.productQuantity === 0 && (
            <div className="absolute inset-0 bg-gray-50 bg-opacity-65 flex items-center justify-center">
              <span className="text-3xl font-bold text-black">품절</span>
            </div>
          )}
        </div>

        {/* 하단 설명 및 버튼 */}
        <div className="absolute left-0 -bottom-1 right-0 bg-white opacity-95 text-black p-4 transform translate-y-full group-hover:-translate-y-0 transition-transform duration-300 ease-in-out">
          <Link to={`${pageRoutes.productDetail}/${product.id}`}>
            <h3 className="text-lg font-bold mt-1">책소개</h3>
            <p className="text-sm text-gray-700 line-clamp-5 mb-5">
              {product.productDescription || "설명이 없습니다."}
            </p>

            <div className="flex justify-between items-center mt-2">
              <span className="block mt-2 rounded text-sm font-bold">
                {product.productPrice.toLocaleString()} 원
              </span>
              <span className="text-sm text-gray-400">
                {getDisplayDate(product.updatedAt)}
              </span>
            </div>
          </Link>
          <div className="flex gap-2 mt-4">
            <button
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
              onClick={handleClickPurchaseButton}
              disabled={product.productQuantity === 0}
            >
              구매하기
            </button>
            {hasCart ? (
              <button
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
                onClick={handleClickModalButton}
                disabled={product.productQuantity === 0}
              >
                상품확인
              </button>
            ) : (
              <button
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg"
                onClick={handleClickAddCartButton}
                disabled={product.productQuantity === 0}
              >
                장바구니
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);
