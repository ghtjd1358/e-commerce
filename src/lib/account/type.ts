import { FieldValue } from "firebase/firestore";

export interface IUser {
  uid: string;
  email: string;
  nickname?: string;
  displayName?: string;
  photoURL?: string | null;
  isSeller: boolean;
  createdAt: Date | FieldValue;
  updatedAt: Date | FieldValue;
}

export interface GoogleUser {
  uid: string;
  email: string;
  nickname?: string;
  displayName: string;
  photoURL: string | null;
  isSeller: boolean;
}