import { db } from "@/app/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const fetchUserData = async (uid: string) => {
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data();
  } else {
    throw new Error("사용자 정보를 Firestore에서 찾을 수 없습니다.");
  }
};

export const createUserData = async (uid: string, email: string, displayName: string | null) => {
  const userDocRef = doc(db, "users", uid);
  await setDoc(userDocRef, {
    nickname: displayName || "",
    email,
    isSeller: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};
