import { authStatusType } from "@/shared/constants";
import { RegisterForm } from "@/pages/register/components/RegisterForm";
import { Layout } from "../common/components/Layout";
import { LogoButton } from "../common/components/LogoButton";

export const RegisterPage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-[470px] max-h-screen flex items-center p-5 border border-lightgray flex-col bg-gray-700 rounded">
          <LogoButton className="my-4"/>
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};
