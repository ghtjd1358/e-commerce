import React from "react";
import { Layout } from "../common/components/Layout";
import { authStatusType } from "@/constants";

export const ProductListingHistoryPage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.IS_SELLER}>
      <h1>하잇</h1>
    </Layout>
  );
};
