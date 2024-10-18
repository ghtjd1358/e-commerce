import { z } from "zod";
import { extractDefaultValues } from "../pages/common/userDefaultValues";

const passwordSchema = z
  .string()
  .regex(/^(?=.*[A-Z])/, "대문자 하나 이상이 필요합니다.")
  .regex(/^(?=.*[a-z])/, "소문자 하나 이상이 필요합니다.")
  .regex(/^(?=.*\d)/, "숫자 하나 이상이 필요합니다.")
  .regex(/^(?=.*[\W_])/, "특수문자 하나 이상이 필요합니다.")
  .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." });

const emailSchema = z
  .string()
  .min(1, { message: "이메일을 입력해 주세요." })
  .email({ message: "유효하지 않은 이메일 형식입니다." });

const nameSchema = z
  .string()
  .min(1, { message: "이름을 입력해 주세요." })
  .max(20, { message: "이름은 20자 이내여야 합니다." })
  .regex(/^[a-zA-Z가-힣]+$/, "이름에는 숫자나 특수문자를 사용할 수 없습니다.");

const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterPayload = z.infer<typeof registerSchema>;
export type LoginPayload = z.infer<typeof loginSchema>;

export const userSchemas = {
  registerSchema,
  loginSchema,
};

export const userDefaultValues = {
  signUpDefaultValues: extractDefaultValues(registerSchema),
  loginDefaultValues: extractDefaultValues(loginSchema),
};
