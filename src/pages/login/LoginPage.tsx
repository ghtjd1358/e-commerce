import { authStatusType } from "@/shared/constants";
import { LoginForm } from "@/pages/login/components/LoginForm";
import { Layout } from "../common/components/Layout";

export const LoginPage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <div className="mx-auto max-w-xl mt-16 bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[500px] max-h-screen flex items-center p-5 flex-col rounded-md">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};
