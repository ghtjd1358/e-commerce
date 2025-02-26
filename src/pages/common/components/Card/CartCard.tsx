import React, { useState } from "react";
import { CartItem } from "@/store/cart/type";
import { useToastStore } from "@/store/toast/useToastStore";
import { Trash2 } from "lucide-react";

interface ProductCardProps {
  product: CartItem;
  removeCartItem: (itemId: string, userId: string) => void;
  user: { uid: string } | null;
  changeCartItemCount: (itemId: string, count: number, userId: string) => void;
  selectCartItem: (itemId: string) => void;
}

export const CartCard: React.FC<ProductCardProps> = ({
  product,
  user,
  removeCartItem,
  changeCartItemCount,
  selectCartItem,
}) => {
  const { addToast } = useToastStore();
  const [count, setCount] = useState<number>(product.count);

  const handleRemoveItem = () => {
    if (user) {
      removeCartItem(product.id, user.uid);
      addToast(
        `${product.productName}이(가) 카트에서 삭제되었습니다.`,
        "success"
      );
    } else {
      addToast("사용자가 로그인하지 않았습니다.", "error");
    }
  };

  const handleIncrease = () => {
    if (user) {
      const newCount = count + 1;
      setCount(newCount);
      changeCartItemCount(product.id, newCount, user.uid);
    }
  };

  const handleDecrease = () => {
    if (user && count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      changeCartItemCount(product.id, newCount, user.uid);
    }
  };

  const handleSelect = () => {
    selectCartItem(product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row border rounded-lg shadow-md p-4 bg-white space-y-4 sm:space-y-0 sm:space-x-4">
      {/* 이미지 */}
      <div className="flex justify-center sm:w-1/4">
        <img
          src={product.productImage[0]}
          alt={product.productName}
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* 상품 정보 */}
      <div className="flex flex-col flex-grow space-y-4">
        {/* 체크박스 및 상품명 */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={product.isSelected}
            onChange={handleSelect}
            className="w-5 h-5 text-gold border-gray-300 rounded focus:ring-gold"
          />
          <span className="font-semibold text-gray-700 text-lg">
            {product.productName}
          </span>
        </div>

        {/* 카테고리 및 가격 */}
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium text-sm">
            {product.productCategory.name}
          </span>
          <span className="text-gray-500 font-medium text-sm">
          {product.productAuthorName} · {product.productPublisher}
          </span>
          <span className="text-gray-900 font-bold text-lg">
            {product.productPrice.toLocaleString()} 원
          </span>
        </div>

        {/* 수량 조절 */}
        <div className="space-x-2">
          <button
            onClick={handleDecrease}
            disabled={count <= 1}
            className="px-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:bg-gray-100"
          >
            -
          </button>
          <span className="text-gray-700 font-semibold">{count}</span>
          <button
            onClick={handleIncrease}
            className="px-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      {/* 삭제 버튼 */}
      <div className="flex justify-end items-end sm:w-auto">
        <button
          onClick={handleRemoveItem}
          className="text-red-500 hover:text-red-700 flex items-center space-x-1"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
