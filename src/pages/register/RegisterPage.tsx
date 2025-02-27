import { authStatusType } from "@/shared/constants";
import { RegisterForm } from "@/pages/register/components/RegisterForm";
import { Layout } from "../common/components/Layout";

export const RegisterPage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <div className="mx-auto max-w-xl mt-16 bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[480px] max-h-screen flex items-center p-5 flex-col rounded-md">
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};
