import React, { memo } from "react";
import { X } from "lucide-react";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useCartStore } from "@/store/cart/useCartStore";
import { EmptyProduct } from "@/pages/common/components/EmptyProduct";
import { useMakePurchase } from "@/features/purchase/hooks/useMakePurchase";
import { CartCard } from "./Card/CartCard";
import { CartSummary } from "./CartSummary";
import { useModalContext } from "@/shared/hooks/useModalContext";
import { AnimatePresence, motion } from "framer-motion";

export const CartModal: React.FC = memo(() => {
  const {
    cart,
    removeCartItem,
    changeCartItemCount,
    selectCartItem,
    selectAllCartItems,
    totalCount,
    totalPrice,
  } = useCartStore();
  const { user } = useAuthStore();
  const { isOpen, closeModal } = useModalContext(); 
  const { mutate: makePurchase } = useMakePurchase();
  const selectedCartItems = cart.filter((item) => item.isSelected);
  

  // 전체 선택 핸들러
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectAllCartItems(e.target.checked);
  };

  // 구매 핸들러
  const handlePurchase = () => {
    if (!user?.uid) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      makePurchase({
        cartData: selectedCartItems,
        userId: user.uid,
      });
      closeModal()
    } catch (error) {
      console.error("구매 오류 발생:", error);
      alert("구매 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const allSelected = cart.every((item) => item.isSelected);

  // Framer Motion 애니메이션 설정
  const modalVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: "0%" },
    exit: { opacity: 0, x: "100%" },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>

          {/* 모달 본문 */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <button
              className="p-4"
              onClick={closeModal} 
            >
              <X />
            </button>
            <div className="p-4 h-full flex flex-col">
              <h2 className="text-2xl font-bold mb-4">장바구니</h2>

              {/* 장바구니 아이템 리스트 */}
              <div className="flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                  <EmptyProduct />
                ) : (
                  <>
                    {/* 전체 선택 체크박스 */}
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={handleSelectAll}
                        className="mr-2"
                      />
                      <span>전체 선택</span>
                    </div>

                    {/* 장바구니 아이템들 */}
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <CartCard
                          key={item.id}
                          product={item}
                          user={user}
                          removeCartItem={removeCartItem}
                          changeCartItemCount={changeCartItemCount}
                          selectCartItem={selectCartItem}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* 주문 요약 및 주문하기 버튼 */}
              {cart.length > 0 && (
                <CartSummary
                  totalCount={totalCount}
                  totalPrice={totalPrice}
                  handlePurchase={handlePurchase}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
