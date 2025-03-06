import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useEffect } from "react";
import { useUpdateAccountStore } from "@/features/account/hooks/useUpdateAccount";
import { useFetchAccount } from "@/features/account/hooks/useFetchAccount";
import { userSchemas } from "@/shared/validation/user";
import { Button } from "@/pages/common/ui/button";
import { Form } from "@/pages/common/ui/form";
import { RHFInput } from "@/pages/common/components/RHFInput";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";
import { DaumPostcode } from "@/pages/Checkuot/components/DaumPostcode";

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
  detailAddress: string;
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
      address: undefined,
      detailAddress: undefined,
      phoneNumber: undefined,
    },
  });

  const { data } = useFetchAccount(user?.uid ?? "");
  const { mutate: accountUpdate, isPending: isLoading } =
    useUpdateAccountStore();

    useEffect(() => {
      if (data) {
        form.reset({
          name: data.displayName,
          nickname: data.nickname,
          email: data.email,
          address: data.address ?? "",  
          phoneNumber: data.phoneNumber ?? "", 
          detailAddress: data.detailAddress ?? "", 
        });
      }
    }, [data, form]);
    

  const handleAddressComplete = (selectedAddress: string) => {
    form.setValue("address", selectedAddress);
  };

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
        detailAddress: data.detailAddress || "",
        phoneNumber: data.phoneNumber,
      } as UpdateUserData,
    });
  };

  return (
    <Card className="w-full max-w-md bg-gray-50 text-black">
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
              <div className="flex flex-col">
                <RHFInput
                  name="address"
                  label="주소"
                  placeholder="주소를 입력해주세요"
                  type="text"
                />
                <RHFInput
                  name="detailAddress"
                  label=""
                  placeholder="상세주소를 입력해주세요"
                  type="text"
                />
                <DaumPostcode onComplete={handleAddressComplete} />
              </div>
              <RHFInput
                name="phoneNumber"
                label="번호"
                placeholder="번호를 입력해주세요"
                type="text"
              />
            </div>
              <Button
                type="submit"
                className="w-full bg-gold hover:bg-yellow-500 text-black font-semibold bg-yellow-400 "
                disabled={isLoading}
              >
                {isLoading ? "저장 중..." : "회원 정보 저장"}
              </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
