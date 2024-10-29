import React from "react";
import { authStatusType, Layout } from "../common/components/Layout";

export const ProductListingHistoryPage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.IS_SELLER}>
      <h1>하잇</h1>
    </Layout>
  );
};
