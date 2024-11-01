import React from "react";
import { Layout } from "../common/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { authStatusType } from "@/constants";
import { Profile } from "../productListing/components/Profile";

export const UserProfilePage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.IS_BUYER}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-32 ">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gold">마이페이지</h1>
          <Profile />
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gold">구매 목록</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((order) => (
                  <div
                    key={order}
                    className="flex items-center justify-between border-b border-gray-700 pb-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Package className="text-gray-400" />
                      <span>Order #{order.toString().padStart(5, "0")}</span>
                    </div>
                    <span className="text-gold">$299.99</span>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 text-gold">
                전체 구매 내역
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
