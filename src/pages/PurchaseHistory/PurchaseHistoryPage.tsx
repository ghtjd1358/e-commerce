import { authStatusType } from "@/shared/constants";
import React from "react";
import { Layout } from "../common/components/Layout";

export const PurchaseHistoryPage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <h1>하잇</h1>
    </Layout>
  );
};
