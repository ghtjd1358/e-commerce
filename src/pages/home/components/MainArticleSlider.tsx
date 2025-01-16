import { ALL_CATEGORY_ID, heroSlides } from "@/shared/constants";
import { Button } from "@/pages/common/ui/button";
import { Link } from "react-router-dom";
import { pageRoutes } from "@/app/apiRouters";
import { useQueryClient } from "@tanstack/react-query";
import { PRODUCT_KEY } from "@/features/products/key";
import { fetchFilterProductsApi } from "@/features/products/api";

export function MainArticleSlider() {
  const queryClient = useQueryClient();

// Prefetch
  const handlePrefetchProducts = async (categoryId: string) => {
    const queryKey = [PRODUCT_KEY, {categoryId}]; 

    const cachedData = queryClient.getQueryData(queryKey);
    console.log(queryKey)

    if (!cachedData) {
      try {
        await queryClient.prefetchQuery({
          queryKey,
          queryFn: async () => {
            const filter = {categoryId}
            const response = await fetchFilterProductsApi(filter, 20, 1);
            return response.products;
          },
        });
        console.log(`Prefetched data for categoryId: ${categoryId}`);
      } catch (error) {
        console.error(`Prefetch failed for categoryId: ${categoryId}`, error);
      }
    } else {
      console.log(`Data already cached for categoryId: ${categoryId}`);
    }
  };

  return (
    <aside className="flex mx-auto max-w-full h-[95vh] mb-3 relative overflow-hidden">
      <section
        aria-label="Featured Products Slideshow"
        className="w-full h-full relative"
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

        <Link to={`${pageRoutes.product}?category=${ALL_CATEGORY_ID}`}>
          <Button
            className="h-20 w-64 absolute left-1/2 bottom-20 transform -translate-x-1/2 bg-gray-700 bg-opacity-50 hover:bg-opacity-15 text-2xl text-gray-300 font-bold"
            onMouseEnter={() => handlePrefetchProducts(ALL_CATEGORY_ID)} 
          >
            All Products
          </Button>
        </Link>

      </section>
    </aside>
  );
}
