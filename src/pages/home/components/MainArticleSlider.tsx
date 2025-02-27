import { useState } from "react";
import { MainSlideContent } from "./MainSliderContent";
import { MainSliderIndicator } from "./MainSliderIndicator";
import { MainSliderControls } from "./MainSliderCtl";
import { heroSlides } from "@/shared/slider";


export function MainArticleSlider() {
  const products = heroSlides

  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index); 
  };

  return (
    <aside className="w-full relative flex justify-center mx-auto max-w-full overflow-hidden">
      <div>
      {/* 배경 이미지 */}
      {products.length > 0 && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{
            backgroundImage: `url(${products[currentIndex].productImage})`,
            backgroundPosition: "center 45%",
          }}
        ></div>
      )}
      {/* 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50"></div>

      {/* 콘텐츠 */}
      <section className="relative w-full h-full p-10 flex mt-12">
        <div className="max-w-screen-xl mx-auto flex mt-10 relative">
          {/* 슬라이드 콘텐츠 */}
          <MainSlideContent product={products[currentIndex]} />

          {/* 이전/다음 버튼 */}
          <MainSliderControls onPrev={handlePrevSlide} onNext={handleNextSlide} />
        </div>
      </section>

      {/* 슬라이드 인디케이터 */}
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
