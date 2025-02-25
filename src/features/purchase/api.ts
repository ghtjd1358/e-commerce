import { db } from "@/app/firebase";
import { doc, runTransaction, collection } from "firebase/firestore";
import { CartItem } from "../../store/cart/type";

export const makePurchaseAPI = async (
  cartData: CartItem[],
  buyerId: string,
) => {
  try {
    await runTransaction(db, async (transaction) => {

      await Promise.all(
        cartData.map(async (item) => {
          const productRef = doc(db, "products", item.id);
          const productSnap = await transaction.get(productRef);

          if (!productSnap.exists())
            throw new Error("상품을 찾을 수 없습니다.");
          const productData = productSnap.data();
          const newQuantity = productData.productQuantity - item.count;

          if (newQuantity < 0) throw new Error("재고가 부족합니다.");

          transaction.update(productRef, { productQuantity: newQuantity });

          const orderRef = doc(collection(db, "orders"));
          transaction.set(orderRef, {
            id: orderRef.id,
            sellerId: productData.sellerId,
            buyerId,
            productId: item.id,
            productQuantity: item.count,
            status: "결제 대기",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }),
      );
    });
  } catch (error) {
    console.error("구매 처리 중 오류 발생:", error);
  }
};
