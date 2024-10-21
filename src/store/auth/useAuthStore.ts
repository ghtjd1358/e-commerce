import { auth, db } from "@/firebase";
import { GoogleUser, IUser } from "../../lib/auth/types";
import Cookies from "js-cookie";
import { create } from "zustand";
import { AuthStore } from "./type";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: !!Cookies.get("accessToken"),
  user: null,
  isSeller: false,

  checkLoginStatus: async () => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        // Firebase Auth 상태 변경 감지 및 처리
        auth.onAuthStateChanged(async (currentUser) => {
          if (currentUser) {
            const userDocRef = doc(db, "users", currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);

            // 유저 정보가 있으면 상태 업데이트
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              set({
                user: {
                  uid: currentUser.uid,
                  nickname: userData.nickname ?? "",
                  email: currentUser.email ?? "",
                  displayName: currentUser.displayName ?? "",
                  photoURL: currentUser.photoURL ?? "",
                  isSeller: userData.isSeller ?? false,
                  createdAt: userData.createdAt ?? "",
                  updatedAt: userData.updatedAt ?? "",
                },
                isLogin: true,
              });
            } else {
              await setDoc(userDocRef, {
                nickname: currentUser.displayName || "",
                email: currentUser.email,
                isSeller: false,
                createdAt: new Date(),
                updatedAt: new Date(),
              });

              set({
                user: {
                  uid: currentUser.uid,
                  email: currentUser.email ?? "",
                  displayName: currentUser.displayName ?? "",
                  photoURL: currentUser.photoURL ?? "",
                  isSeller: false,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
                isLogin: true,
              });
            }
          } else {
            set({
              user: null,
              isLogin: false,
            });
            console.error("사용자가 로그인되어 있지 않습니다.");
          }
        });
      } catch (error) {
        console.error("유저 정보를 가져오는 중 에러가 발생했습니다.", error);
        set({ user: null, isLogin: false });
      }
    } else {
      set({ user: null, isLogin: false });
    }
  },

  logout: () => {
    Cookies.remove("accessToken");
    console.log("로그아웃 되었습니다.");
    set({
      isLogin: false,
      user: null,
    });
  },

  setIsLogin: (isLogin: boolean) => {
    set({ isLogin });
  },

  setIsSeller: (isSeller: boolean) => {
    set({ isSeller });
  },

  setUser: (user?: IUser | GoogleUser) => {
    console.log("사용자 정보가 업데이트되었습니다:", user);
    set({ user });
  },
}));
