import React from "react";
import { TabsList } from "@radix-ui/react-tabs";
import { Star } from "lucide-react";
import { IProduct } from "@/features/products/type";
import { Card, CardContent } from "@/pages/common/ui/card";
import { Tabs, TabsContent, TabsTrigger } from "@/pages/common/ui/tabs";

interface ProductDetailReviewProps {
  findProducts: IProduct;
}

export const ProductDetailReview: React.FC<ProductDetailReviewProps> = ({
  findProducts,
}) => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-gray-800">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="mt-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <p className="text-gray-300">{findProducts.productDescription}</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="specifications" className="mt-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Movement: Swiss Quartz</li>
              <li>Case Material: Stainless Steel</li>
              <li>Case Diameter: 42mm</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reviews" className="mt-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b border-gray-700 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-gold text-gold"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">Son ho seong</span>
                  </div>
                  <p className="text-gray-300">gun good</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
