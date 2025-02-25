import { Button } from "@/pages/common/ui/button";
import { useFormContext } from "react-hook-form";

interface BuyerLoginButtonProps {
  onSubmit: () => void; // 폼 제출 핸들러를 부모로부터 전달받음
}

export const SellerLoginButton: React.FC<BuyerLoginButtonProps> = ({
  onSubmit,
}) => {
  const form = useFormContext(); // React Hook Form 컨텍스트 사용

  const handleClickSellerLogin = () => {
    // 이메일과 비밀번호 필드에 기본값 설정
    form.setValue("email", "seller@test.com");
    form.setValue("password", "123qweQWE!");

    // 부모 컴포넌트에서 전달받은 onSubmit 호출
    onSubmit();
  };

  return (
    <Button
      variant="ghost"
      className="w-full flex items-center justify-center bg-gray-700 text-white gap-4 font-bold hover:bg-blue-300"
      onClick={handleClickSellerLogin}
    >
      판매자 로그인
    </Button>
  );
};
