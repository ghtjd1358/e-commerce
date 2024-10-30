import { authStatusType } from "@/constants";
import { Layout } from "../common/components/Layout";
import { RegisterForm } from "./components/RegisterForm";

export const RegisterPage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-[470px] max-h-screen flex items-center p-5 border border-lightgray flex-col bg-gray-700 rounded">
          <h1 className="text-2xl font-bold text-yellow-500 mx-auto my-4 tracking-widest">
            이커머스
          </h1>
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};
