import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authStatusType, Layout } from "../common/components/Layout";
import { ProductCardSquare } from "../common/components/ProductCardSquare";
import { useFetchProducts } from "@/lib/products/hooks/useFetchProducts";

export const PurchasePage: React.FC = () => {
  const { data } = useFetchProducts();

  return (
    <Layout authStatus={authStatusType.NEED_LOGIN}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-12">
        <div className="min-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gold">Your Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {data?.map((product) => (
                <ProductCardSquare key={product.id} product={product} />
              ))}
            </div>
            <div>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gold">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$8,999.96</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$720.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-gold">
                    <span>Total</span>
                    <span>$9,719.96</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button className="w-full bg-gold hover:bg-gold/90 text-gray-900">
                    Proceed to Checkout
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Enter coupon code"
                      className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-gold focus:border-gold"
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
