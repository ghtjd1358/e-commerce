import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  userSchemas,
  LoginPayload,
  userDefaultValues,
} from "../../../schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { RHFInput } from "@/pages/common/components/RHFInput";

export const LoginForm: React.FC = () => {
  const form = useForm<LoginPayload>({
    mode: "onChange",
    resolver: zodResolver(userSchemas.registerSchema),
    defaultValues: userDefaultValues.signUpDefaultValues,
  });

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
        <Form {...form}>
          <form className="space-y-5">
            <div className="grid gap-4">
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
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full bg-gold hover:bg-gold/90 text-gray-100 bg-gray-700 border-gray-600">
          계정 생성
        </Button>
        <p className="text-right text-sm text-gray-400">
          계성이 없습니까?{" "}
          <a href="#" className="text-gold hover:underline">
            회원가입
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};
