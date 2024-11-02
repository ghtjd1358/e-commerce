import React from "react";
import { Layout } from "../common/components/Layout";
import { authStatusType } from "@/constants";
import { Profile } from "../productListing/components/Profile";
import { ProducProfiletList } from "./components/ProducProfiletList";

export const UserProfilePage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.IS_BUYER}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-32 ">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gold">마이페이지</h1>
          <Profile />

          <ProducProfiletList />
        </div>
      </div>
    </Layout>
  );
};
