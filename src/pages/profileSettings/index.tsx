import React from "react";
import { authStatusType, Layout } from "../common/components/Layout";

export const ProfileSettingsPage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <h1>하잇</h1>
    </Layout>
  );
};
