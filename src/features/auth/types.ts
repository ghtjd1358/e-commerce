import { FieldValue } from "firebase/firestore";

export interface IUser {
  uid: string;
  email: string;
  nickname?: string;
  displayName?: string;
  photoURL?: string | null;
  isSeller: boolean;
  address?: string;
  detailAddress?: string;
  phoneNumber?: string;
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
  address?: string;
  detailAddress?: string;
  phoneNumber?: string;
}

export interface RegisterUserReqDTO {
  email: string;
  password: string;
  name: string;
  nickname: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  uid: string;
  email: string;
  nickname?: string;
  displayName?: string;
  isSeller: boolean;
  accessToken: string;
  photoURL: string | null;
  createdAt: Date;
  updatedAt: Date;
}
