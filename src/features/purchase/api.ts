import { db } from "@/app/firebase";
import {
  doc,
  runTransaction,
  collection,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { CartItem } from "../../store/cart/type";

export const makePurchaseAPI = async (
  cartData: CartItem[],
  buyerId: string,
) => {
  try {
    console.log("🛒 구매 API 호출");
    const orderIds: string[] = [];

    await runTransaction(db, async (transaction) => {
      console.log("🔄 트랜잭션 시작");

      await Promise.all(
        cartData.map(async (item) => {
          const productRef = doc(db, "products", item.id);
          const productSnap = await transaction.get(productRef);

          if (!productSnap.exists())
            throw new Error("상품을 찾을 수 없습니다.");
          console.log(`✅ 상품 ${item.id} 찾음`);

          const productData = productSnap.data();
          const newQuantity = productData.productQuantity - item.count;
          console.log(`🔢 새로운 재고 수량 계산됨: ${newQuantity}`);

          if (newQuantity < 0) throw new Error("재고가 부족합니다.");

          // 상품 재고 감소
          transaction.update(productRef, { productQuantity: newQuantity });
          console.log(`⬇️ 상품 ${item.id} 재고 감소: ${newQuantity}`);

          // 주문 정보 생성
          const orderRef = doc(collection(db, "orders"));
          transaction.set(orderRef, {
            id: orderRef.id,
            sellerId: productData.sellerId,
            buyerId: buyerId,
            productId: item.id,
            productQuantity: item.count,
            status: "결제 대기",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          orderIds.push(orderRef.id);
          console.log(`📝 주문 생성됨: ${orderRef.id}`);
        }),
      );

      console.log("🔄 트랜잭션 종료");
    });

    console.log("✅ 모든 트랜잭션 완료");

    // 결제 대기 상태에 대한 재고 복구 로직
    setTimeout(async () => {
      console.log("⏰ 타이머 완료, 재고 복구 시작");
      for (const orderId of orderIds) {
        const orderRef = doc(db, "orders", orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists() && orderSnap.data()?.status === "결제 대기") {
          console.log(`🕵️‍♂️ 주문 ${orderId} 상태 확인: 결제 대기`);

          const item = cartData.find(
            (c) => c.id === orderSnap.data()?.productId,
          );
          if (!item) continue;

          await runTransaction(db, async (transaction) => {
            const productRef = doc(db, "products", item.id);
            const productSnap = await transaction.get(productRef);
            const productData = productSnap.data();

            const restoredQuantity =
              productData?.productQuantity + orderSnap.data()?.productQuantity;
            console.log(`♻️ 재고 복구 수량: ${restoredQuantity}`);

            transaction.update(productRef, {
              productQuantity: restoredQuantity,
            });
            transaction.update(orderRef, { status: "취소됨" });
            console.log(
              `♻️ 상품 ${item.id} 재고 복구 및 상태 '취소됨'으로 변경`,
            );
          });
        } else {
          console.log(`⛔️ 주문 ${orderId}는 결제 대기 상태가 아님`);
        }
      }
    }, 3000000);

    console.log("✅ 재고 복구 로직 설정 완료");
  } catch (error) {
    if (error instanceof Error) {
      console.error("구매 처리 중 오류 발생:", error.message);
      alert(`구매 처리 중 오류가 발생했습니다: ${error.message}`);
    } else {
      console.error("구매 처리 중 알 수 없는 오류 발생:", error);
      alert("구매 처리 중 알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
};
