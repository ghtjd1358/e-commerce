import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userSchemas } from "../../../schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { RHFInput } from "@/pages/common/components/RHFInput";
import { Form } from "@/components/ui/form";
import { useUpdateAccountStore } from "@/lib/account/hooks/useUpdateAccount";
import { useFetchAccount } from "@/lib/account/hooks/useFetchAccount";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useEffect } from "react";
import { IUser, GoogleUser } from "@/lib/auth/types";

type UpdateUserData = {
  name?: string;
  nickname?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
};

interface FormInputs {
  name: string;
  nickname: string;
  email: string;
  address: string;
  phoneNumber: string;
}

export const AccountForm: React.FC = () => {
  const { user } = useAuthStore();
  const form = useForm<FormInputs>({
    mode: "onChange",
    resolver: zodResolver(userSchemas.accountSchema),
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      address: "",
      phoneNumber: "",
    },
  });

  const { data } = useFetchAccount(user?.uid ?? "");
  console.log(data);

  const { mutate: accountUpdate, isPending: isLoading } =
    useUpdateAccountStore();

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.displayName,
        nickname: data.nickname,
        email: data.email,
        address: (data as IUser | GoogleUser).address ?? "",
        phoneNumber: (data as IUser | GoogleUser).phoneNumber ?? "",
      });
    }
  }, [data, form]);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (!user?.uid) {
      alert("사용자 UID가 유효하지 않습니다.");
      return;
    }
    accountUpdate({
      uid: user.uid,
      updatedData: {
        name: data.name,
        nickname: data.nickname,
        email: data.email,
        address: data.address,
        phoneNumber: data.phoneNumber,
      } as UpdateUserData,
    });
  };

  return (
    <Card className="w-full max-w-md bg-gray-800 text-gray-100 border-gray-700">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-gold tracking-wider">
          회원 정보 변경
        </CardTitle>
        <p className="text-center text-gray-400">정보를 업데이트하세요.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-4">
              <RHFInput
                name="name"
                label="이름"
                placeholder="이름을 입력해주세요"
                type="text"
              />
              <RHFInput
                name="nickname"
                label="닉네임"
                placeholder="닉네임을 입력해주세요"
                type="text"
              />
              <RHFInput
                name="email"
                label="이메일"
                placeholder="m@example.com"
                type="email"
              />
              <RHFInput
                name="address"
                label="주소"
                placeholder="주소를 입력해주세요"
                type="text"
              />
              <RHFInput
                name="phoneNumber"
                label="전화번호"
                placeholder="전화번호를 입력해주세요"
                type="text"
              />
            </div>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-gold hover:bg-gray-600 text-gray-100 bg-gray-700 "
                disabled={isLoading}
              >
                {isLoading ? "저장 중..." : "회원 정보 저장"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
