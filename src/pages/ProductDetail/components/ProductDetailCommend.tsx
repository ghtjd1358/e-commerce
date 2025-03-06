import React from "react";
import { IProduct } from "@/features/products/type";
import { Link, useNavigate } from "react-router-dom";
import { pageRoutes } from "@/app/apiRouters";

interface RecommendedProductsProps {
  recommendations: IProduct[];
}

export const ProductDetailCommend: React.FC<RecommendedProductsProps> = ({
  recommendations,
}) => {
  const navigate = useNavigate();

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  // 추천 상품을 최대 4개로 제한
  const limitedRecommendations = recommendations.slice(0, 4);

  return (
    <div className="mt-12">
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6">추천 상품</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {limitedRecommendations.map((product) => (
          <Link to={`${pageRoutes.productDetail}/${product.id}`}>
          <div
            key={product.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            {/* 상품 이미지 */}
            <img
              src={product.productImage[0]}
              alt={product.productName}
              className="w-full h-48 object-cover rounded-md"
            />
            {/* 상품 이름 */}
            <h3 className="text-lg font-semibold mt-2 line-clamp-1">{product.productName}</h3>
            {/* 저자 및 출판사 */}
            <p className="text-sm text-gray-500 line-clamp-1">
              {product.productAuthorName || "알 수 없음"} ·{" "}
              {product.productPublisher || "알 수 없음"}
            </p>
            {/* 가격 */}
            <p className="text-xl font-bold text-yellow-500 mt-2">
              {product.productPrice.toLocaleString()} 원
            </p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
