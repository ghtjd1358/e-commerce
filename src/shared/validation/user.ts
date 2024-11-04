import { z } from "zod";
import { extractDefaultValues } from "../utils/userDefaultValues";

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// 전화번호 정규식을 수정하여 '-'가 있어도 되고 없어도 되도록 설정
const PHONE_PATTERN = /^(01[016789])\d{3,4}\d{4}$/;

// 비밀번호 스키마
const passwordSchema = z
  .string()
  .regex(/^(?=.*[A-Z])/, "대문자 하나 이상이 필요합니다.")
  .regex(/^(?=.*[a-z])/, "소문자 하나 이상이 필요합니다.")
  .regex(/^(?=.*\d)/, "숫자 하나 이상이 필요합니다.")
  .regex(/^(?=.*[\W_])/, "특수문자 하나 이상이 필요합니다.")
  .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." });

// 이메일 스키마
const emailSchema = z
  .string()
  .min(1, { message: "이메일을 입력해 주세요." })
  .regex(EMAIL_PATTERN, { message: "유효하지 않은 이메일 형식입니다." });

// 이름 스키마
const nameSchema = z
  .string()
  .min(1, { message: "이름을 입력해주세요." })
  .min(2, { message: "이름은 최소 2글자여야 합니다." })
  .max(20, { message: "이름은 20자 이내여야 합니다." })
  .regex(/^[a-zA-Z가-힣]+$/, "이름에는 숫자나 특수문자를 사용할 수 없습니다.");

// 닉네임 스키마
const nicknameSchema = z
  .string()
  .min(1, { message: "닉네임을 입력해 주세요." })
  .max(20, { message: "닉네임은 20자 이내여야 합니다." });

// 주소 스키마
const addressSchema = z.string().min(1, { message: "주소를 입력해 주세요." });

// 휴대폰 번호
const phoneSchema = z
  .string()
  .min(1, { message: "휴대폰 번호를 입력해 주세요." })
  .regex(PHONE_PATTERN, { message: "유효하지 않은 휴대폰 번호 형식입니다." });

// 회원가입 스키마
const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  nickname: nicknameSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
});

// 비밀번호 일치 여부 검증 추가
const refinedRegisterSchema = registerSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  },
);

// 로그인 스키마
const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// 회원 정보 스키마
const accountSchema = z.object({
  name: nameSchema,
  nickname: nicknameSchema,
  email: emailSchema,
  address: addressSchema.optional(),
  phoneNumber: phoneSchema.optional(),
});

// 타입 정의
export type RegisterPayload = z.infer<typeof registerSchema>;
export type LoginPayload = z.infer<typeof loginSchema>;
export type AccountPayload = z.infer<typeof accountSchema>;

export const userSchemas = {
  registerSchema: refinedRegisterSchema,
  loginSchema,
  accountSchema,
};

export const userDefaultValues = {
  signUpDefaultValues: extractDefaultValues(registerSchema),
  loginDefaultValues: extractDefaultValues(loginSchema),
  accountDefaultValues: extractDefaultValues(accountSchema),
};
