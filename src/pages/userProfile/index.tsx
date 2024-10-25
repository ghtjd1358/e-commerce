import React from "react";
import { authStatusType, Layout } from "../common/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Package, ShoppingBag, User } from "lucide-react";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useSellerUser } from "@/lib/auth/hooks/useSellerAuth";

export const UserProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const { mutate: selller } = useSellerUser();

  const handlerSellerRegister = () => {
    selller();
  };

  return (
    <Layout authStatus={authStatusType.IS_BUYER}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-20 ">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gold">마이페이지</h1>

          <Card className=" bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-500">계정 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center space-x-2">
                <div className="flex gap-2">
                  <User className="text-gray-400" />
                  <span>{user?.displayName}</span>
                </div>
                <Button onClick={handlerSellerRegister}>판매자 등록</Button>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="text-gray-400" />
                <span>{user?.email}</span>
              </div>
              <Button variant="outline" className="mt-4">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

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

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gold">Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Total Orders</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Wishlist Items</span>
                <span className="font-bold">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Reward Points</span>
                <span className="font-bold text-gold">2,500</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-gold hover:bg-gold/90 text-gray-900">
              <ShoppingBag className="mr-2 h-4 w-4" /> View Cart
            </Button>
            <Button
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-gray-900"
            >
              <User className="mr-2 h-4 w-4" /> Manage Account
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
