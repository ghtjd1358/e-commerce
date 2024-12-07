// import { useEffect, useState } from "react";
import { ALL_CATEGORY_ID, heroSlides } from "@/shared/constants";
import { Button } from "@/pages/common/ui/button";
import { Link } from "react-router-dom";
import { pageRoutes } from "@/app/apiRouters";

export function MainArticleSlider() {
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const [isTransitioning, setIsTransitioning] = useState(false);
  // const [isPaused, setIsPaused] = useState(false);

  // const nextSlide = () => {
  //   setIsTransitioning(true);
  //   setTimeout(() => {
  //     setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  //     setIsTransitioning(false);
  //   }, 1000);
  // };

  // const prevSlide = () => {
  //   setIsTransitioning(true);
  //   setTimeout(() => {
  //     setCurrentSlide(
  //       (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
  //     );
  //     setIsTransitioning(false);
  //   }, 1000);
  // };

  // useEffect(() => {
  //   if (!isPaused) {
  //     const imageInterval = setInterval(nextSlide, 4000);
  //     return () => clearInterval(imageInterval);
  //   }
  // }, [isPaused]);

  return (
    <aside className="flex mx-auto max-w-full h-[95vh] mb-3 relative overflow-hidden">
      <section
        aria-label="Featured Products Slideshow"
        className="w-full h-full relative"
        // onMouseEnter={() => setIsPaused(true)}
        // onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-100`}
        >
          <img
            src={heroSlides[0].image} 
            alt={heroSlides[0].alt}
            className="w-full h-full object-fill"
          />
        </div>

        <div
          className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-1000 ease-in-out opacity-100`}
        >
          <h2 className="text-3xl font-bold text-gray-200 opacity-40 tracking-widest mt-60">
            {heroSlides[0].title} 
          </h2>
        </div>

        {/* 슬라이드 전환 버튼 제거 */}
        {/* <Button
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
        </Button> */}

        <Link to={`${pageRoutes.product}?category=${ALL_CATEGORY_ID}`}>
        <Button className="h-20 w-64 absolute left-1/2 bottom-20 transform -translate-x-1/2 bg-gray-700 bg-opacity-50 hover:bg-opacity-15 text-2xl text-gray-300 font-bold">
          All Products
        </Button>
        </Link>
      
      </section>
    </aside>
  );
}
