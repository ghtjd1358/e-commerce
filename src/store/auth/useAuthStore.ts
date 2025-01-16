import { auth } from "@/app/firebase";
import { IUser, GoogleUser } from "@/features/auth/types";
import Cookies from "js-cookie";
import { create } from "zustand";
import { AuthStore } from "./type";
import { createUserData, fetchUserData } from "@/shared/utils/firestoreUser";

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: !!Cookies.get("accessToken"),
  user: null,
  isLoading: true,

  checkLoginStatus: async () => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        auth.onAuthStateChanged(async (currentUser) => {
          if (currentUser) {
            try {
              // Firestore에서 사용자 데이터 가져오기
              const userData = await fetchUserData(currentUser.uid);
              set({
                user: {
                  uid: currentUser.uid,
                  nickname: userData.nickname ?? "",
                  email: currentUser.email ?? "",
                  displayName: currentUser.displayName ?? "",
                  photoURL: currentUser.photoURL ?? "",
                  isSeller: userData.isSeller ?? false,
                  address: userData.address ?? "",
                  detailAddress: userData.detailAddress ?? "",
                  phoneNumber: userData.phoneNumber ?? "",
                },
                isLogin: true,
                isLoading: false,
              });
            } catch (error) {
              await createUserData(
                currentUser.uid,
                currentUser.email ?? "",
                currentUser.displayName ?? ""
              );
              console.log(error)
  
              set({
                user: {
                  uid: currentUser.uid,
                  email: currentUser.email ?? "",
                  displayName: currentUser.displayName ?? "",
                  photoURL: currentUser.photoURL ?? "",
                  isSeller: false,
                },
                isLogin: true,
                isLoading: false,
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

  setUser: (user?: IUser | GoogleUser) => {
    console.log("사용자 정보가 업데이트되었습니다:", user);
    set({ user });
  },
}));
