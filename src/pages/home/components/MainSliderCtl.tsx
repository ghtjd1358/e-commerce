import React from "react";
import { Button } from "@/pages/common/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

export const MainSliderControls: React.FC<SliderControlsProps> = ({
  onPrev,
  onNext,
}) => {
  return (
    <>
      {/* 이전 버튼 */}
      <Button
        onClick={onPrev}
        variant={null}
        className="absolute bottom-10 right-[5.5rem] text-black rounded-full hover:bg-gray-200 transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {/* 다음 버튼 */}
      <Button
        onClick={onNext}
        variant={null}
        className="absolute bottom-10 right-5 text-black rounded-full hover:bg-gray-200 transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </>
  );
};
