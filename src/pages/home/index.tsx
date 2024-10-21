import React, { useState } from "react";

// Slider
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, Star } from "lucide-react";
// Product List
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth/userAuthStore";

export const HomePage: React.FC = () => {
  // Slider
  const { user } = useAuthStore();
  console.log("유저 정보", user);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: "/placeholder.svg?height=400&width=1200",
      alt: "Luxury Watch",
      title: "Timeless Elegance",
    },
    {
      image: "/placeholder.svg?height=400&width=1200",
      alt: "Designer Handbag",
      title: "Iconic Style",
    },
    {
      image: "/placeholder.svg?height=400&width=1200",
      alt: "Premium Jewelry",
      title: "Radiant Beauty",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  // Product List
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const categories = ["All", "Watches", "Bags", "Jewelry", "Accessories"];

  const products = [
    {
      id: 1,
      name: "Luxury Chronograph",
      price: 4999,
      category: "Watches",
      rating: 5,
    },
    {
      id: 2,
      name: "Designer Tote Bag",
      price: 2999,
      category: "Bags",
      rating: 4,
    },
    {
      id: 3,
      name: "Diamond Necklace",
      price: 7999,
      category: "Jewelry",
      rating: 5,
    },
    {
      id: 4,
      name: "Leather Wallet",
      price: 599,
      category: "Accessories",
      rating: 4,
    },
    {
      id: 5,
      name: "Silk Scarf",
      price: 399,
      category: "Accessories",
      rating: 5,
    },
    {
      id: 6,
      name: "Gold Bracelet",
      price: 1299,
      category: "Jewelry",
      rating: 4,
    },
    {
      id: 7,
      name: "Sunglasses",
      price: 799,
      category: "Accessories",
      rating: 4,
    },
    {
      id: 8,
      name: "Leather Belt",
      price: 299,
      category: "Accessories",
      rating: 5,
    },
    {
      id: 9,
      name: "Pearl Earrings",
      price: 899,
      category: "Jewelry",
      rating: 5,
    },
  ];

  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 3, products.length));
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1],
  );

  return (
    <div className="min-h-screen bg-gray-800 text-gray-200">
      {/* Slider */}
      <aside className="flex mx-auto w-screen h-[85vh] mb-3 relative">
        <section aria-label="Featured Products Slideshow">
          <img
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-5xl font-bold text-yellow-500">
              {heroSlides[currentSlide].title}
            </h2>
          </div>
          <Button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <Button className="h-20 w-64 absolute left-1/2 bottom-20 transform -translate-x-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-xl">
            더보기
          </Button>
        </section>
      </aside>

      {/* list */}
      <main>
        <section className="mt-12 p-10">
          <div className="flex justify-between items-center mb-6">
            <h2>Our Products</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 bg-gray-800 border-gray-700"
                />
              </div>
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
                      key={category.toLowerCase()}
                      value={category.toLowerCase()}
                    >
                      {category}
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
    </div>
  );
};
