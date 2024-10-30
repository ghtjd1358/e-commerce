import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import animal from "../../../../public/animal-17760_1280.jpg";
import soldier from "../../../../public/gun-1927664_1280.jpg";
import woman from "../../../../public/woman-6567047_1280.jpg";
import whiskey from "../../../../public/whiskey-4939956_1280.jpg";

export function MainArticleSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const heroSlides = [
    { image: soldier, alt: "Luxury Watch", title: "Timeless Elegance" },
    { image: woman, alt: "Designer Handbag", title: "Iconic Style" },
    { image: whiskey, alt: "Premium Jewelry", title: "Radiant Beauty" },
    { image: animal, alt: "Animal", title: "Beautiful Nature" },
  ];

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, 1000);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(
        (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
      );
      setIsTransitioning(false);
    }, 1000);
  };

  useEffect(() => {
    if (!isPaused) {
      const imageInterval = setInterval(nextSlide, 4000);
      return () => clearInterval(imageInterval);
    }
  }, [isPaused]);

  return (
    <aside className="flex mx-auto max-w-full h-[95vh] mb-3 relative overflow-hidden">
      <section
        aria-label="Featured Products Slideshow"
        className="w-full h-full relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].alt}
            className="w-full h-full object-fill"
          />
        </div>

        <div
          className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <h2 className="text-5xl font-bold text-white opacity-30 tracking-widest mt-60">
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
