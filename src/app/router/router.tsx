import { createBrowserRouter } from "react-router-dom";
import { pageRoutes } from "../apiRouters";
import { CommonLayout } from "./routerLayout";
import { ErrorPage } from "@/pages/error/ErrorPage";
import { NotFoundPage } from "@/pages/error/NotFoundPage";
import { HomePage } from "@/pages/home/HomePage";
// import { BuyerDashboardPage } from "@/pages/BuyerDashboard/BuyerDashboardPage";
// import { LoginPage } from "@/pages/login/LoginPage";
// import { RegisterPage } from "@/pages/register/RegisterPage";
// import { CheckoutPage } from "@/pages/Checkuot/CheckoutPage";
// import { ProfileEditPage } from "@/pages/ProfileEdit/ProfileEditPage";
import { lazy } from "react";

const LoginPage = lazy(() =>
  import("@/pages/login/LoginPage").then((module) => ({
    default: module.LoginPage,
  }))
);

const RegisterPage = lazy(() =>
  import("@/pages/register/RegisterPage").then((module) => ({
    default: module.RegisterPage,
  }))
);

const CheckoutPage = lazy(() =>
  import("@/pages/Checkuot/CheckoutPage").then((module) => ({
    default: module.CheckoutPage,
  }))
);

const ProfileEditPage = lazy(() =>
  import("@/pages/ProfileEdit/ProfileEditPage").then((module) => ({
    default: module.ProfileEditPage,
  }))
);

const BuyerDashboardPage = lazy(() =>
  import("@/pages/BuyerDashboard/BuyerDashboardPage").then((module) => ({
    default: module.BuyerDashboardPage,
  }))
);


const SellerDashboardPage = lazy(() =>
  import("@/pages/SellerDashboard/SellerDashboardPage").then((module) => ({
    default: module.SellerDashboardPage,
  })),
);

const ProductPage = lazy(() =>
  import("@/pages/product/ProductPage").then((module) => ({
    default: module.ProductPage,
  })),
);

const ProductDetaiPage = lazy(() =>
  import("@/pages/ProductDetail/ProductDetaiPage").then((module) => ({
    default: module.ProductDetaiPage,
  })),
);

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
        path: pageRoutes.product,
        element: <ProductPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: `${pageRoutes.productDetail}/:id`,
        element: <ProductDetaiPage />,
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
