// MainArticleSlider.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { MainSlideContent } from "./MainSliderContent";
import { MainSliderIndicator } from "./MainSliderIndicator";
import { MainSliderControls } from "./MainSliderCtl";
import { heroSlides } from "@/shared/slider";

export function MainArticleSlider() {
  const products = heroSlides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleIndicatorClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <aside className="w-full relative flex justify-center mx-auto max-w-full overflow-hidden">
      <div>
        {products.length > 0 && (
          <div
            className="absolute inset-0 bg-cover opacity-90"
            style={{
              backgroundImage: `url(${products[currentIndex].productImage})`,
              backgroundPosition: "center 45%",
            }}
          ></div>
        )}
        <div className="absolute inset-0 bg-white opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50"></div>

        <section className="relative w-full h-full p-10 flex mt-8">
          <div className="max-w-screen-xl mx-auto flex flex-col mt-10 relative">
            <div><h3 className="text-5xl font-bold mb-2 tracking-wide">오늘의 책</h3></div>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 270, damping: 100 },
                  opacity: { duration: 1.2 },
                }}
              >
                <MainSlideContent product={products[currentIndex]} />
              </motion.div>            
          </div>
          <MainSliderControls onPrev={handlePrevSlide} onNext={handleNextSlide} />
        </section>

        {products.length > 0 && (
          <MainSliderIndicator
            products={products}
            currentIndex={currentIndex}
            onClick={handleIndicatorClick}
          />
        )}
      </div>
    </aside>
  );
}