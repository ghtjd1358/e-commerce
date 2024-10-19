import { z } from "zod";
import { extractDefaultValues } from "../pages/common/userDefaultValues";

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
  .email({ message: "유효하지 않은 이메일 형식입니다." });

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
  (data) => {
    if (data.password !== data.confirmPassword) {
      return false;
    }
    return true;
  },
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

// 타입 정의
export type RegisterPayload = z.infer<typeof registerSchema>;
export type LoginPayload = z.infer<typeof loginSchema>;

export const userSchemas = {
  registerSchema: refinedRegisterSchema,
  loginSchema,
};

export const userDefaultValues = {
  signUpDefaultValues: extractDefaultValues(registerSchema),
  loginDefaultValues: extractDefaultValues(loginSchema),
};
