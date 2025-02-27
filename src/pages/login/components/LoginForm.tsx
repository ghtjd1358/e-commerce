import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { pageRoutes } from "@/app/apiRouters";
import { Link } from "react-router-dom";
import { useLoginUser } from "@/features/auth/hooks/userLogin";
import { Button } from "@/pages/common/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";
import {
  userSchemas,
  LoginPayload,
  userDefaultValues,
} from "@/shared/validation/user";
import { Form } from "@/pages/common/ui/form";
import { RHFInput } from "@/pages/common/components/RHFInput";
import { BuyerLoginButton } from "./BuyerLoginButton";
import { SellerLoginButton } from "./SellerLoginButton";
import { LogoButton } from "@/pages/common/components/LogoButton";

interface FormInput {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const form = useForm<LoginPayload>({
    mode: "onChange",
    resolver: zodResolver(userSchemas.loginSchema),
    defaultValues: userDefaultValues.loginDefaultValues,
  });

  const { mutate: login, isPending: isLoading } = useLoginUser();

  // 로그인 폼 제출 핸들러
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Card className="w-full max-w-md text-gray-800 border border-gray-300 shadow-lg rounded-lg">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold text-gold tracking-wide">
           <LogoButton className="my-4" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              {/* 이메일 입력 필드 */}
              <div className="space-y-4 mb-6">
              <RHFInput
                name="email"
                label="이메일"
                placeholder="이메일을 입력해주세요"
                type="email"
                className="border-gray-300 focus:ring-gold focus:border-gold"
              />
              {/* 비밀번호 입력 필드 */}
              <RHFInput
                name="password"
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요"
                type="password"
                className="border-gray-300 focus:ring-gold focus:border-gold"
              />
              </div>
              {/* 로그인 버튼 */}
              <Button
                variant="ghost"
                className="w-full h-10 appearance-none border border-solid border-gray-300 flex items-center justify-center text-black gap-4 font-bold hover:bg-blue-200"
                disabled={isLoading}
              >
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>

              <BuyerLoginButton onSubmit={form.handleSubmit(onSubmit)} />
              <SellerLoginButton onSubmit={form.handleSubmit(onSubmit)} />
              <GoogleLoginButton />
            </form>
          </Form>
        </FormProvider>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        {/* 회원가입 링크 */}
        <p className="text-sm text-gray-400">
          계정이 없으신가요?{" "}
          <Link to={pageRoutes.register} className="text-black hover:underline">
            회원가입
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
