import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { pageRoutes } from "../apiRouters";
import { CommonLayout } from "./routerLayout";

// 페이지들을 lazy로 동적 임포트
const ProductDetaiPage = lazy(() =>
  import("@/pages/ProductDetail/ProductDetaiPage").then((module) => ({
    default: module.ProductDetaiPage,
  })),
);
const LoginPage = lazy(() =>
  import("@/pages/login/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);
const RegisterPage = lazy(() =>
  import("@/pages/register/RegisterPage").then((module) => ({
    default: module.RegisterPage,
  })),
);
const CheckoutPage = lazy(() =>
  import("@/pages/Checkuot/CheckoutPage").then((module) => ({
    default: module.CheckoutPage,
  })),
);
const ProfileEditPage = lazy(() =>
  import("@/pages/ProfileEdit/ProfileEditPage").then((module) => ({
    default: module.ProfileEditPage,
  })),
);
const PaymentPage = lazy(() =>
  import("@/pages/payment/PaymentPage").then((module) => ({
    default: module.PaymentPage,
  })),
);
const ErrorPage = lazy(() =>
  import("@/pages/error/ErrorPage").then((module) => ({
    default: module.ErrorPage,
  })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/error/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  })),
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
const HomePage = lazy(() =>
  import("@/pages/home/HomePage").then((module) => ({
    default: module.HomePage,
  })),
);
const ShoppingCartPage = lazy(() =>
  import("@/pages/cart/ShoppingCartPage").then((module) => ({
    default: module.ShoppingCartPage,
  })),
);
const BuyerDashboardPage = lazy(() =>
  import("@/pages/BuyerDashboard/BuyerDashboardPage").then((module) => ({
    default: module.BuyerDashboardPage,
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
