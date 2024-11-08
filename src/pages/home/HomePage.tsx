import { authStatusType } from "@/shared/constants";
import { MainProductList } from "@/pages/home/components/MainProductList";
import { MainArticleSlider } from "./components/MainArticleSlider";
import { Layout } from "../common/components/Layout";
import { Suspense } from "react";
// import { ApiErrorBoundary } from "../common/components/ApiErrorBoundary";

export const HomePage: React.FC = () => {
  return (
    <Layout authStatus={authStatusType.COMMON}>
      <div className="w-full bg-gray-800 text-gray-200">
        <MainArticleSlider />
        <Suspense fallback={<LoadingSkeleton />}>
          <MainProductList />
        </Suspense>
      </div>
    </Layout>
  );
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {[...Array(12)].map((_, index) => (
      <div
        key={index}
        className="h-64 bg-gray-600 rounded-lg animate-pulse mb-32"
      />
    ))}
  </div>
);
