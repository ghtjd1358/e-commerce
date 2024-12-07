import "./app/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/router";
// import { onCLS, onINP, onFCP, onLCP, onTTFB } from "web-vitals";

// const reportWebVitals = (onPerfEntry?: (metric) => void) => {
//   if (onPerfEntry && typeof onPerfEntry === "function") {
//     onCLS(onPerfEntry);
//     onINP(onPerfEntry);
//     onFCP((metric) => {
//       onPerfEntry(metric);
//     });
//     onLCP((metric) => {
//       onPerfEntry(metric);
//     });
//     onTTFB(onPerfEntry);
//   }
// };

// reportWebVitals((metric) => {
//   console.log("Web Vitals Metric:", metric);
// });

const queryClient = new QueryClient();

const isDevEnvironment = import.meta.env.DEV;

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      {isDevEnvironment && <ReactQueryDevtools />}
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}
