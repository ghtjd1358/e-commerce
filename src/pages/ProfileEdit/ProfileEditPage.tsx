import React, { lazy } from "react";
import { authStatusType } from "@/shared/constants";
import { Layout } from "../common/components/Layout";
import { AccountForm } from "./components/AccountForm";

export const ProfileEditPage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-[470px] max-h-screen flex items-center p-5 border border-lightgray flex-col bg-yellow-300 rounded-2xl">
          <AccountForm />
        </div>
      </div>
    </Layout>
  );
};
