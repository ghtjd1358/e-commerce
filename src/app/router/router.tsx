import { createBrowserRouter } from "react-router-dom";
import { pageRoutes } from "../apiRouters";
import { CommonLayout } from "./routerLayout";
import { LoginPage } from "@/pages/login/LoginPage";
import { RegisterPage } from "@/pages/register/RegisterPage";
import { CheckoutPage } from "@/pages/Checkuot/CheckoutPage";
import { ProfileEditPage } from "@/pages/ProfileEdit/ProfileEditPage";
import { PaymentPage } from "@/pages/payment/PaymentPage";
import { ErrorPage } from "@/pages/error/ErrorPage";
import { NotFoundPage } from "@/pages/error/NotFoundPage";
import { SellerDashboardPage } from "@/pages/SellerDashboard/SellerDashboardPage";
import { HomePage } from "@/pages/home/HomePage";
import { ShoppingCartPage } from "@/pages/cart/ShoppingCartPage";
import { BuyerDashboardPage } from "@/pages/BuyerDashboard/BuyerDashboardPage";
import { ProductPage } from "@/pages/product/ProductPage";
import { ProductDetaiPage } from "@/pages/ProductDetail/ProductDetaiPage";

// import { lazy } from "react";

// const ProductPage = lazy(() =>
//   import("@/pages/product/ProductPage").then((module) => ({
//     default: module.ProductPage,
//   })),
// );

// const ProductDetaiPage = lazy(() =>
//   import("@/pages/ProductDetail/ProductDetaiPage").then((module) => ({
//     default: module.ProductDetaiPage,
//   })),
// );

export const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      {
        path: pageRoutes.main,
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: `${pageRoutes.product}/:category`,
        element: <ProductPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: `${pageRoutes.productDetail}/:id`,
        element: <ProductDetaiPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.shoppingcart,
        element: <ShoppingCartPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.buyerdashboard,
        element: <BuyerDashboardPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.checkout,
        element: <CheckoutPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.profileEdit,
        element: <ProfileEditPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.sellerdashboard,
        element: <SellerDashboardPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.payment,
        element: <PaymentPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: pageRoutes.register,
        element: <RegisterPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.login,
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
