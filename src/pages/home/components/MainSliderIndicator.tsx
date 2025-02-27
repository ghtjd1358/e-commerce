import React from "react";

interface SliderIndicatorProps {
  products: any[];
  currentIndex: number;
  onClick: (index: number) => void;
}

export const MainSliderIndicator: React.FC<SliderIndicatorProps> = ({
  products,
  currentIndex,
  onClick,
}) => {
  return (
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
      {products.map((_, index) => (
        <span
          key={index}
          onClick={() => onClick(index)}
          className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
            index === currentIndex
              ? "bg-gray-800 scale-[1.2]"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        ></span>
      ))}
    </div>
  );
};
