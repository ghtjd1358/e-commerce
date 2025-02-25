import { db } from "@/app/firebase";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { AccountPayload } from "@/shared/validation/user";
import { IUser } from "./type";

export const getAccountApi = async (uid: string): Promise<IUser> => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return {
        uid,
        email: userData.email,
        nickname: userData.nickname,
        displayName: userData.name,
        photoURL: userData.photoURL,
        isSeller: userData.isSeller,
        address: userData.address,
        detailAddress: userData.detailAddress,
        phoneNumber: userData.phoneNumber,
        createdAt: userData.createdAt.toDate(),
        updatedAt: userData.updatedAt.toDate(),
      };
    } else {
      throw new Error("사용자 정보를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("프로필 정보 조회 중 오류 발생:", error);
    throw new Error("프로필 정보 조회에 실패했습니다.");
  }
};

// 프로필 정보 업데이트 API
export const updateAccountApi = async (
  uid: string,
  updatedData: Partial<AccountPayload>,
): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      ...updatedData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("프로필 정보 업데이트 중 오류 발생:", error);
    throw new Error("프로필 정보 업데이트에 실패했습니다.");
  }
};

// 계정 삭제 API
export const deleteAccountApi = async (uid: string): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    await deleteDoc(userRef);
    // console.log("계정이 성공적으로 삭제되었습니다.");
  } catch (error) {
    console.error("계정 삭제 중 오류 발생:", error);
    throw new Error("계정 삭제에 실패했습니다.");
  }
};
