import React, { useState } from "react";
import { IProduct } from "@/features/products/type";

interface ProductDetailImageProps {
  findProducts: IProduct;
}

export const ProductDetailImage: React.FC<ProductDetailImageProps> = ({
  findProducts,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gray-800 rounded-lg">
        <img
          src={findProducts.productImage[selectedImageIndex]}
          alt="Main Product Image"
          className="w-full h-full object-fill"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {findProducts.productImage.map((image, i) => (
          <div
            key={i}
            className={`aspect-square bg-gray-800 overflow-hidden cursor-pointer ${selectedImageIndex === i && "border-2 border-yellow-600"}`}
            onClick={() => setSelectedImageIndex(i)}
          >
            <img
              src={image || "장고"}
              alt={`Product Image ${i + 1}`}
              className="w-full h-full object-fill"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
