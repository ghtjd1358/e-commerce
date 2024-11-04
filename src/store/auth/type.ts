import { IUser, GoogleUser } from "@/features/auth/types";

export interface AuthStore {
  isLogin: boolean;
  user: IUser | GoogleUser | null;
  isLoading: boolean;
  checkLoginStatus: () => Promise<void>;
  logout: () => void;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user?: IUser | GoogleUser) => void;
}
