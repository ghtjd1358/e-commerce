import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Minus, Plus, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { Layout } from "../common/components/Layout";
import { useFetchProducts } from "@/lib/products/hooks/useFetchProducts";
import { authStatusType } from "@/constants";

interface ProductListProps {
  pageSize?: number;
}

export const ProductDetailPage: React.FC<ProductListProps> = () => {
  const { id } = useParams();
  const { data } = useFetchProducts();
  const findProducts = data?.find((item) => item.id === String(id));
  console.log(findProducts);

  const [quantity, setQuantity] = useState(1);

  if (!findProducts) return <p>Product not found</p>;

  return (
    <Layout authStatus={authStatusType.COMMON}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-14 pt-32">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={findProducts.productImage[0]}
                  alt="Main Product Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {findProducts.productImage.map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-800 rounded-lg overflow-hidden"
                  >
                    <img
                      src={findProducts.productImage[i] || "장고"}
                      alt={`Product Image ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gold">
                {findProducts.productName}
              </h1>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">(24 reviews)</span>
              </div>
              <p className="text-2xl font-bold text-gold">
                ${findProducts.productPrice}
              </p>
              <p className="text-gray-400">{findProducts.productDescription}</p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4 text-black" />
                    </Button>
                    <Input
                      id="quantity"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(parseInt(e.target.value) || 1)
                      }
                      className="w-16 text-center bg-gray-800 border-gray-700 text-gray-100"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4 text-black" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="flex-1 bg-gray-600 hover:bg-gold/90 text-white">
                  구매하기
                </Button>
                <Button className="flex-1 bg-gray-700 hover:bg-gold/90 text-white">
                  장바구니
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <p className="text-gray-300">
                    {findProducts.productDescription}
                  </p>
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
                    <li>Band Material: Stainless Steel</li>
                    <li>Water Resistance: 100 meters</li>
                    <li>Crystal: Sapphire</li>
                    <li>Functions: Chronograph, Date Display</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div
                        key={review}
                        className="border-b border-gray-700 pb-4"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="w-4 h-4 fill-gold text-gold"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-400">
                            John Doe
                          </span>
                        </div>
                        <p className="text-gray-300">
                          This watch exceeded my expectations. The craftsmanship
                          is impeccable, and it looks even better in person.
                          Highly recommended!
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};
