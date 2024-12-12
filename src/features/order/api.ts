import { db } from "@/app/firebase";
import {
  doc,
  // updateDoc,
  collection,
  query,
  where,
  getDocs,
  runTransaction,
  orderBy,
} from "firebase/firestore";
import { OrderStatus } from "./types";

interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  status: string;
  createdAt: string;
  productId?: string;
}

// 구매자 주문 조회 API
export const getOrdersForBuyerApi = async (
  buyerId: string,
  statuses?: string[] // 상태를 배열로 받음
) => {
  try {
    const ordersRef = collection(db, "orders");
    let ordersQuery;

    if (statuses && statuses.length > 0) {
      // 여러 상태를 필터링
      ordersQuery = query(
        ordersRef,
        where("buyerId", "==", buyerId),
        where("status", "in", statuses),
        orderBy("createdAt", "desc")
      );
    } else {
      // 상태 없이 전체 조회
      ordersQuery = query(ordersRef, where("buyerId", "==", buyerId),orderBy("createdAt", "desc") );
    }

    const ordersSnapshot = await getDocs(ordersQuery);

    // 결과 매핑
    const orders = ordersSnapshot.docs.map((doc) => {
      const orderData = doc.data() as Order; // 데이터 타입 명시
      return {
        ...orderData,  
        id: doc.id,   
      };
    });

    return orders;
  } catch (error) {
    console.error("구매자 주문 목록 조회 중 오류:", error);
    throw error;
  }
};




// 판매자 주문 조회 API
export const getOrdersForSellerApi = async (sellerId: string) => {
  try {
    const q = query(
      collection(db, "orders"),
      where("sellerId", "==", sellerId),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("판매자 판매 목록 조회 중 오류:", error);
    throw error;
  }
};

// 주문 취소 API
export const cancelOrderApi = async (orderId: string) => {
  try {
    await runTransaction(db, async (transaction) => {
      const orderRef = doc(db, "orders", orderId);
      const orderSnap = await transaction.get(orderRef);

      if (!orderSnap.exists()) {
        throw new Error("주문을 찾을 수 없습니다.");
      }

      // 주문 상태를 "CANCELLED"로 변경
      transaction.update(orderRef, { status: "주문 취소" });
      console.log(`주문 ${orderId} 상태가 '결제취소'로 변경되었습니다.`);
    });

    console.log("주문 취소 완료");
  } catch (error) {
    if (error instanceof Error) {
      console.error("주문 취소 중 오류 발생:", error.message);
      alert(`주문 취소 중 오류가 발생했습니다: ${error.message}`);
    } else {
      console.error("주문 취소 중 알 수 없는 오류 발생:", error);
      alert("주문 취소 중 알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
};

// 구매자 주문 상태 변경 API
export const updateOrderStatusApi = async (
  orderId: string,
  newStatus: OrderStatus,
) => {
  try {
    await runTransaction(db, async (transaction) => {
      const orderRef = doc(db, "orders", orderId);
      const orderSnap = await transaction.get(orderRef);

      if (!orderSnap.exists()) {
        throw new Error("주문을 찾을 수 없습니다.");
      }

      const currentStatus = orderSnap.data().status;

      if (currentStatus === OrderStatus.SHIPPED) {
        throw new Error("발송된 주문은 상태를 변경할 수 없습니다.");
      }

      transaction.update(orderRef, { status: newStatus });
      console.log(`주문 ${orderId} 상태가 '${newStatus}'로 변경되었습니다.`);
    });

    console.log("주문 상태 업데이트 완료");
  } catch (error) {
    if (error instanceof Error) {
      console.error("주문 상태 변경 중 오류 발생:", error.message);
      alert(`주문 상태 변경 중 오류가 발생했습니다: ${error.message}`);
    } else {
      console.error("주문 상태 변경 중 알 수 없는 오류 발생:", error);
      alert(
        "주문 상태 변경 중 알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
      );
    }
  }
};
