import { useFetchOrders } from "@/features/order/hooks/useFetchOrders";
import { useUpdateOrderStatus } from "@/features/order/hooks/useUpdateSellerOrders";
import { OrderStatus } from "@/features/order/types";
import { Button } from "@/pages/common/ui/button";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useCartStore } from "@/store/cart/useCartStore";
import React, { useEffect, useState } from "react";

export const CheckoutBtn: React.FC = () => {
  const { user } = useAuthStore();
  const { cart, totalPrice, removeCartItem } = useCartStore();
  const { mutate: updateOrderStatus } = useUpdateOrderStatus();
  const { data: orders = [] } = useFetchOrders(user?.uid ?? "", ["결제 대기"]);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const loadIamportScript = () => {
    if (!document.querySelector('script[src="https://cdn.iamport.kr/v1/iamport.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.iamport.kr/v1/iamport.js';
      script.async = true;
      script.onload = () => {
        setIsScriptLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setIsScriptLoaded(true);
    }
  };

  useEffect(() => {
    loadIamportScript();
  }, []);

  const selectedCartItems = cart.filter((item) => item.isSelected);
  const selectedCartItemsProductName = selectedCartItems.map(
    (item) => item.productName,
  );
  const selectedCartItemsId = selectedCartItems.map((item) => item.id);

  // 선택된 상품과 일치하는 주문 찾기
  const orderMaps = orders.filter((item) =>
    selectedCartItemsId.includes(item.productId ?? ""),
  );

  const handlePayment = () => {
    if (!user) {
      alert("사용자 정보가 없습니다.");
      return;
    }

    if (!isScriptLoaded) {
      alert("스크립트가 로드되지 않았습니다.");
      return;
    }

    const paymentData = {
      pg: "paypal",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`, // 가맹점 주문번호
      name: `${selectedCartItemsProductName}`, // 상품명
      amount: totalPrice,
      buyer_name: user?.displayName,
      buyer_email: user?.email || "",
      buyer_tel: user?.phoneNumber || "",
      buyer_addr: `${user?.address || ""} ${user?.detailAddress || ""}`,
    };

    // 결제 요청
    const IMP = (window as any).IMP;
    IMP.init("imp58346007");
    IMP.request_pay(paymentData, (response: any) => {
      if (response.success) {
        // 결제 성공 시 주문 상태 업데이트
        alert("결제가 완료되었습니다!");
      } else {
        alert(`결제 실패: ${response.error_msg}`);
        orderMaps.forEach((order) => {
          updateOrderStatus({
            orderId: order.id,
            newStatus: OrderStatus.COMPLETED,
          });
        });

        // 로컬 스토리지에서 장바구니 항목 제거
        selectedCartItems.forEach((item) => {
          removeCartItem(item.id, user.uid);
        });
      }
    });
  };

  return <Button onClick={handlePayment}>카카오페이 결제</Button>;
};
