import {
  userSchemas,
  RegisterPayload,
  userDefaultValues,
} from "@/shared/validation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { pageRoutes } from "@/app/apiRouters";
import { useDebounce } from "@/shared/hooks/useAuthCheck";
import { useRegisterUser } from "@/features/auth/hooks/userRegister";
import { useCheckNicknameExists } from "@/features/auth/hooks/useCheckAuth";
import { Button } from "@/pages/common/ui/button";
import { RHFInput } from "@/pages/common/components/RHFInput";
import { Form } from "@/pages/common/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/pages/common/ui/card";

interface FormInputs {
  name: string;
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm: React.FC = () => {
  const form = useForm<RegisterPayload>({
    mode: "onChange",
    resolver: zodResolver(userSchemas.registerSchema),
    defaultValues: userDefaultValues.signUpDefaultValues,
  });

  const { mutate: registerUser, isPending: isLoading } = useRegisterUser();

  const nickname = useWatch({ control: form.control, name: "nickname" });
  const debouncedNickname = useDebounce(nickname, 500);

  const { data: nicknameExists, isLoading: isCheckingNickname } =
    useCheckNicknameExists(debouncedNickname);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    registerUser({
      name: data.name,
      nickname: data.nickname,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Card className="w-full max-w-md bg-gray-800 text-gray-100 border-gray-700">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-gold tracking-wider">
          회원가입
        </CardTitle>
        <p className="text-center text-gray-400">
          간편하게 회원가입하고 다양한 서비스를 이용해 보세요!
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <RHFInput
                  name="name"
                  label="이름"
                  placeholder="이름을 입력해주세요"
                  type="text"
                />
              </div>
              <div className="grid gap-2">
                <RHFInput
                  name="nickname"
                  label="닉네임"
                  placeholder="닉네임을 입력해주세요"
                  type="text"
                />
                {/* 닉네임 체크 상태 표시 */}
                {isCheckingNickname ? (
                  <p className="text-yellow-500 text-xs">닉네임 확인 중...</p>
                ) : nicknameExists ? (
                  <p className="text-red-500 text-xs">
                    이미 존재하는 닉네임입니다.
                  </p>
                ) : (
                  nickname && (
                    <p className="text-green-500 text-xs">
                      사용 가능한 닉네임입니다.
                    </p>
                  )
                )}
              </div>
              <div className="grid gap-2">
                <RHFInput
                  name="email"
                  label="이메일 : "
                  placeholder="m@example.com"
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
              <div className="grid gap-2">
                <RHFInput
                  name="confirmPassword"
                  label="비밀번호 확인 : "
                  placeholder="비밀번호를 다시 입력해주세요"
                  type="password"
                />
              </div>
            </div>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-gold hover:bg-gold/90 text-gray-100 bg-gray-700 border-gray-600"
                disabled={isLoading}
              >
                {isLoading ? "가입 중..." : "회원가입"}
              </Button>
              <p className="text-right text-sm text-gray-400">
                이미 계정이 있습니까?{" "}
                <Link
                  to={pageRoutes.login}
                  className="text-gold hover:underline"
                >
                  로그인
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
