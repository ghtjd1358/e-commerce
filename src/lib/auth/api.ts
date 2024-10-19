import { auth, db, provider } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  FieldValue,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import Cookies from "js-cookie";
import {
  IUser,
  LoginRequestDto,
  LoginResponseDto,
  RegisterUserReqDTO,
} from "./types";

//이메일 중복 체크 API
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

//닉네임 중복 체크 API
export const checkNicknameExists = async (
  nickname: string,
): Promise<boolean> => {
  const q = query(collection(db, "users"), where("nickname", "==", nickname));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

// 회원가입 API
export const registerUserAPI = async ({
  email,
  password,
  name,
  nickname,
}: RegisterUserReqDTO): Promise<IUser> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;

  await updateProfile(user, { displayName: name });

  const userRef = doc(db, "users", user.uid);
  const createdAt = serverTimestamp();
  await setDoc(userRef, {
    name,
    email,
    nickname,
    isSeller: false,
    createdAt,
    updatedAt: createdAt,
  });

  return {
    uid: user.uid,
    email: user.email!,
    nickname,
    displayName: name,
    photoURL: user.photoURL,
    isSeller: false,
    createdAt,
    updatedAt: createdAt,
  };
};

// Google 로그인 API
export const googleSocialApi = async () => {
  try {
    // Google 로그인 처리
    const results = await signInWithPopup(auth, provider);
    const user = results.user;

    const token = await user.getIdToken();
    Cookies.set("accessToken", token, { expires: 30 });
    console.log("이것은 쿼리에서", user.email);

    // 세션 상태 변경 감지 및 토큰 갱신
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const newToken = await user.getIdToken(true);
        Cookies.set("accessToken", newToken, { expires: 30 });
      } else {
        Cookies.remove("accessToken");
      }
    });

    return {
      uid: user.uid,
      email: user.email ?? "",
      displayName: user.displayName ?? "",
      photoURL: user.photoURL,
      isSeller: false,
      accessToken: token,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error("Google 로그인 에러:", error);
    throw new Error("Google 로그인에 실패했습니다.");
  }
};

// 로그인 API
export const loginAPI = async (
  loginData: LoginRequestDto,
): Promise<LoginResponseDto> => {
  try {
    const { email, password } = loginData;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    const token = await user.getIdToken();
    Cookies.set("accessToken", token, { expires: 30 });

    // Firestore에서 추가 정보 (nickname) 가져오기
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return {
        uid: user.uid,
        email: user.email ?? "",
        displayName: user.displayName ?? "",
        nickname: userData.nickname ?? "",
        isSeller: userData.isSeller ?? false,
        photoURL: user.photoURL ?? "",
        accessToken: token,
        createdAt:
          userData.createdAt instanceof FieldValue
            ? new Date()
            : userData.createdAt.toDate(),
        updatedAt:
          userData.updatedAt instanceof FieldValue
            ? new Date()
            : userData.updatedAt.toDate(),
      };
    } else {
      throw new Error("사용자 정보를 Firestore에서 찾을 수 없습니다.");
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error during login:", error);
    }
    throw new Error("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
  }
};
