import { db } from "@/app/firebase";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  runTransaction,
} from "firebase/firestore";

// 구매자 주문 조회 API
export const getOrdersForBuyerApi = async (buyerId: string) => {
  try {
    const q = query(collection(db, "orders"), where("buyerId", "==", buyerId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("구매자 주문 목록 조회 중 오류:", error);
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
      transaction.update(orderRef, { status: "CANCELLED" });
      console.log(`주문 ${orderId} 상태가 'CANCELLED'로 변경되었습니다.`);
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

// 판매자 주문 조회 및 상태 변경 API
// export const getOrdersForSellerApi = async (sellerId: string) => {
//   try {
//     const q = query(
//       collection(db, "orders"),
//       where("sellerId", "==", sellerId),
//     );
//     const querySnapshot = await getDocs(q);

//     return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   } catch (error) {
//     console.error("판매자 주문 목록 조회 중 오류:", error);
//     throw error;
//   }
// };

// 주문 상태 업데이트 API
// export const updateOrderStatusApi = async (
//   orderId: string,
//   newStatus: string,
// ) => {
//   try {
//     const orderRef = doc(db, "orders", orderId);
//     await updateDoc(orderRef, { status: newStatus, updatedAt: new Date() });
//     console.log(`주문 상태가 '${newStatus}'로 업데이트되었습니다.`);
//   } catch (error) {
//     console.error("주문 상태 업데이트 중 오류:", error);
//     throw error;
//   }
// };
