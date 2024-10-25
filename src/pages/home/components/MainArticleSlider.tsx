import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function MainArticleSlider() {
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

  return (
    <aside className="flex mx-auto max-w-full h-[85vh] mb-3 relative overflow-hidden">
      <section
        aria-label="Featured Products Slideshow"
        className="w-full h-full relative"
      >
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
  );
}
