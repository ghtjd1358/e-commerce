import React from "react";
import { Layout } from "../common/components/Layout";
import { authStatusType } from "@/constants";
import { AccountForm } from "./components/AccountForm";

export const ProfileSettingsPage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <div className="min-h-screen bg-gray-800 flex items-center justify-center p-32">
        <div className="w-full max-w-[470px] max-h-screen flex items-center p-5 border border-lightgray flex-col bg-gray-700 rounded">
          <AccountForm />
        </div>
      </div>
    </Layout>
  );
};
