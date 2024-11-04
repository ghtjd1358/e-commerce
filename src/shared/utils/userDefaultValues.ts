import { ZodObject, ZodTypeAny } from "zod";

// Zod 스키마에서 기본값을 추출하는 함수
export const extractDefaultValues = (schema: ZodObject<any>) => {
  // 각 필드의 기본값을 추출하여 객체로 반환
  const defaultValues: Record<string, any> = {};

  // 스키마의 각 필드에 대해 순회
  Object.keys(schema.shape).forEach((key) => {
    const fieldSchema: ZodTypeAny = schema.shape[key];

    // 기본값이 있는지 확인하고, 있으면 설정
    if (fieldSchema._def.defaultValue !== undefined) {
      defaultValues[key] = fieldSchema._def.defaultValue();
    } else {
      defaultValues[key] = undefined; // 기본값이 없는 경우
    }
  });

  return defaultValues;
};
