import { db } from "@/app/firebase";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
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

// 판매자 주문 조회 및 상태 변경 API
export const getOrdersForSellerApi = async (sellerId: string) => {
  try {
    const q = query(
      collection(db, "orders"),
      where("sellerId", "==", sellerId),
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("판매자 주문 목록 조회 중 오류:", error);
    throw error;
  }
};

// 주문 상태 업데이트 API
export const updateOrderStatusApi = async (
  orderId: string,
  newStatus: string,
) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: newStatus, updatedAt: new Date() });
    console.log(`주문 상태가 '${newStatus}'로 업데이트되었습니다.`);
  } catch (error) {
    console.error("주문 상태 업데이트 중 오류:", error);
    throw error;
  }
};
