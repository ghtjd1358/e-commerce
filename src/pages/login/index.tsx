import { authStatusType } from "@/constants";
import { Layout } from "../common/components/Layout";
import { LoginForm } from "./components/LoginForm";

export const LoginPage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-[470px] max-h-screen flex items-center p-5 border border-lightgray flex-col bg-gray-700 rounded-md">
          <h1 className="text-2xl font-bold text-yellow-400 my-4 tracking-widest">
            이커머스
          </h1>
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};
