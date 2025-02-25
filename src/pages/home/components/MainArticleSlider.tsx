import { useState } from "react";
import { useFetchInfiniteQueryProducts } from "@/features/products/hooks/useFetchInfiniteQueryProducts";
import { Button } from "@/pages/common/ui/button";

export function MainArticleSlider() {
  const { data } = useFetchInfiniteQueryProducts({ pageSize: 20 });

  // 원본 products 배열 유지
  const products = data?.pages?.flatMap((page) => page.products) || [];

  // 슬라이드 상태 관리
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

  return (
    <>
      <aside className="w-full relative flex justify-center mx-auto max-w-full h-[60vh] overflow-hidden">
        {/* 배경 이미지 */}
        {products.length > 0 && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{
              backgroundImage: `url(${products[currentIndex].productImage?.[0]})`,
              backgroundPosition : "center 45%"
            }}
          ></div>
        )}
        {/* 그라데이션 효과 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50"></div>

        {/* 콘텐츠 */}
        <section className="relative w-full h-full p-10 flex mt-12">
          <div className="max-w-screen-xl mx-auto flex mt-10">
            {/* 이전 버튼 */}
            <Button
              onClick={handlePrevSlide}
              className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full"
            >
              이전
            </Button>

            {/* 슬라이드 콘텐츠 */}
            <div className="flex gap-10 transition-transform duration-500">
              {products.length > 0 ? (
                <div
                  key={products[currentIndex].id}
                  className="w-[95vw] h-full flex items-center gap-7"
                >
                  {/* 이미지 섹션 */}
                  <div className="w-64 flex items-center justify-center">
                    <img
                      src={products[currentIndex].productImage?.[0]}
                      alt={products[currentIndex].productName}
                      className="max-w-full h-3/4 object-contain mb-4 rounded-lg border border-gray-700"
                    />
                  </div>

                  {/* 텍스트 섹션 */}
                  <div className="w-full h-[350px] text-left">
                    <h1 className="text-3xl font-bold text-gold">
                      {products[currentIndex].productName}
                    </h1>
                    <p className="text-2xl text-gray-500 font-bold text-gold mt-3 mb-4 ml-1">
                      {products[currentIndex].productPrice} 원
                    </p>
                    <p className="text-white max-w-5xl ml-2">
                      {products[currentIndex].productDescription}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">상품 정보가 없습니다.</p>
              )}
            </div>

            {/* 다음 버튼 */}
            <Button
              onClick={handleNextSlide}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full"
            >
              다음
            </Button>
          </div>
        </section>
      </aside>
    </>
  );
}
