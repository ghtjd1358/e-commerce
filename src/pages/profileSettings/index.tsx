import React from "react";
import { Layout } from "../common/components/Layout";
import { authStatusType } from "@/constants";

export const ProfileSettingsPage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <h1>하잇</h1>
    </Layout>
  );
};
