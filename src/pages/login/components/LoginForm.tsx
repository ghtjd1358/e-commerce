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
    <Card className="w-full max-w-md bg-gray-800 text-gray-100 border-gray-700">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-gold tracking-wider">
          로그인
        </CardTitle>
        <p className="text-center text-gray-400">
          환영합니다! 로그인해 주세요.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <RHFInput
                    name="email"
                    label="이메일 : "
                    placeholder="이메일을 입력해주세요"
                    type="email"
                  />
                </div>
                <div className="grid gap-2">
                  <RHFInput
                    name="password"
                    label="비밀번호 : "
                    placeholder="비밀번호를 입력해주세요"
                    type="password"
                  />
                </div>
              </div>
              <CardFooter className="flex flex-col space-y-4">
                {/* 일반 로그인 버튼 */}
                <Button
                  variant="ghost"
                  className="w-full bg-gold hover:bg-gold/90 text-gray-100 bg-gray-700 hover:bg-blue-300"
                  disabled={isLoading}
                >
                  {isLoading ? "접속중입니다..." : "로그인"}
                </Button>

                {/* 구매자 로그인 버튼 */}
                <BuyerLoginButton onSubmit={form.handleSubmit(onSubmit)} />
                <SellerLoginButton onSubmit={form.handleSubmit(onSubmit)} />

                {/* 회원가입 링크 */}
                <p className="text-right text-sm text-gray-400">
                  계정이 없습니까?{" "}
                  <Link
                    to={pageRoutes.register}
                    className="text-gold hover:underline"
                  >
                    회원가입
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Form>
        </FormProvider>
        <GoogleLoginButton />
      </CardContent>
    </Card>
  );
};
