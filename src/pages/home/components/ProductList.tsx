import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";
import { useState } from "react";

export const ProductList: React.FC = () => {
  // 더미데이터
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const categories = ["all", "watches", "bags", "jewelry", "accessories"]; // 카테고리를 소문자로 변경

  const products = [
    {
      id: 1,
      name: "Luxury Chronograph",
      price: 4999,
      category: "watches", // 소문자로 변경
      rating: 5,
    },
    {
      id: 2,
      name: "Designer Tote Bag",
      price: 2999,
      category: "bags", // 소문자로 변경
      rating: 4,
    },
    {
      id: 3,
      name: "Diamond Necklace",
      price: 7999,
      category: "jewelry", // 소문자로 변경
      rating: 5,
    },
    {
      id: 4,
      name: "Leather Wallet",
      price: 599,
      category: "accessories", // 소문자로 변경
      rating: 4,
    },
    {
      id: 5,
      name: "Silk Scarf",
      price: 399,
      category: "accessories", // 소문자로 변경
      rating: 5,
    },
    {
      id: 6,
      name: "Gold Bracelet",
      price: 1299,
      category: "jewelry", // 소문자로 변경
      rating: 4,
    },
    {
      id: 7,
      name: "Sunglasses",
      price: 799,
      category: "accessories", // 소문자로 변경
      rating: 4,
    },
    {
      id: 8,
      name: "Leather Belt",
      price: 299,
      category: "accessories", // 소문자로 변경
      rating: 5,
    },
    {
      id: 9,
      name: "Pearl Earrings",
      price: 899,
      category: "jewelry", // 소문자로 변경
      rating: 5,
    },
  ];

  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 3, products.length));
  };

  // 필터링 로직 수정
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "all" || product.category === selectedCategory) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1],
  );

  return (
    <main>
      <section className="mt-12 p-10">
        <div className="flex justify-between items-center mb-6">
          <h2>Our Products</h2>
          <div className="flex items-center gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category} // 소문자로 설정된 카테고리와 일치하도록 변경
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                    {/* 카테고리 첫 글자 대문자로 */}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.slice(0, visibleProducts).map((product) => (
            <Card key={product.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <img
                  src={`/placeholder.svg?height=200&width=300`}
                  alt={product.name}
                  className="w-full h-[192px] object-cover mb-4 rounded-lg"
                />
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-yellow-500 font-bold">
                    ${product.price}
                  </span>
                  <div className="flex items-center">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-gold hover:bg-gold/90 text-gray-900">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {visibleProducts < filteredProducts.length && (
          <div className="text-center mt-8">
            <Button onClick={loadMore} variant="outline">
              Load More
            </Button>
          </div>
        )}
      </section>
    </main>
  );
};
