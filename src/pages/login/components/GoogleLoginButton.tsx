import { useGoogleLoginUser } from "@/features/auth/hooks/userGoogleLogin";
import { Button } from "@/pages/common/ui/button";

export const GoogleLoginButton = () => {
  const { mutate: googleLogin } = useGoogleLoginUser();

  const handleClickGoogleLogin = () => {
    googleLogin();
  };

  return (
    <Button
      variant="ghost"
      className="w-full flex items-center justify-center text-black gap-4 font-bold hover:bg-blue-200 border border-solid border-gray-300"
      onClick={handleClickGoogleLogin}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google Logo"
        className="w-5 h-5"
      />
      구글 로그인
    </Button>
  );
};
