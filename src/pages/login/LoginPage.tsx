import { authStatusType } from "@/shared/constants";
import { LoginForm } from "@/pages/login/components/LoginForm";
import { Layout2 } from "../common/components/Layout2"

export const LoginPage: React.FC = () => {
  return (
    <Layout2 authStatus={authStatusType.NEED_NOT_LOGIN}>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-[500px] flex items-center p-5 flex-col rounded-md">
          <LoginForm />
        </div>
      </div>
    </Layout2>
  );
};
