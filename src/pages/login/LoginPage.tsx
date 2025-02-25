import { authStatusType } from "@/shared/constants";
import { LoginForm } from "@/pages/login/components/LoginForm";
import { Layout } from "../common/components/Layout";
import { LogoButton } from "../common/components/LogoButton";

export const LoginPage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-[470px] max-h-screen flex items-center p-5 border border-lightgray flex-col bg-gray-700 rounded-md">
          <LogoButton className="my-4" />
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};
