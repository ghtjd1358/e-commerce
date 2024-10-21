import { IUser, GoogleUser } from "../../lib/auth/types";

export interface AuthStore {
  isLogin: boolean;
  user: IUser | GoogleUser | null;
  isSeller: boolean;
  checkLoginStatus: () => Promise<void>;
  logout: () => void;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user?: IUser | GoogleUser) => void;
}
