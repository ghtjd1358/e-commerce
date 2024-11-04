import { authStatusType } from "@/shared/constants";
import React from "react";
import { Layout } from "../common/components/Layout";

export const PaymentPage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <div>index</div>
    </Layout>
  );
};
