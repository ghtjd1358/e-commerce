import "./app/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/router";
import { ModalProvider } from "@/shared/hooks/useModalContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { heroSlides } from "./shared/slider";

const queryClient = new QueryClient();

const isDevEnvironment = import.meta.env.DEV;

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <HelmetProvider>
      <Helmet>
      {heroSlides.map((slide, index) => (
        <link key={index} rel="preload" as="image" href={slide.productImage} crossOrigin="anonymous" />
      ))}
  </Helmet>
      <QueryClientProvider client={queryClient}>
        {isDevEnvironment && <ReactQueryDevtools />}
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
