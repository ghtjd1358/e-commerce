import React from "react";
import { IProduct } from "@/features/products/type";
import {  
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious, 
} from "@/pages/common/ui/carousel";




interface ProductDetailImageProps {
  findProducts: IProduct;
}

export const ProductDetailImage: React.FC<ProductDetailImageProps> = ({
  findProducts,
}) => {
  return (
    <div className="space-y-4">
      {/* 캐러셀 적용 */}
      <div className="rounded-lg">
        <Carousel className="w-full">
          <CarouselContent>
            {findProducts.productImage.map((image, i) => (
              <CarouselItem key={i}>
                <img
                  src={image}
                  alt={`Product Image ${i + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* 썸네일 리스트 */}
      <div className="w-full grid grid-cols-4 gap-3">
        {findProducts.productImage.map((image, i) => (
          <div key={i} className="overflow-hidden cursor-pointer">
            <img
              src={image}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
