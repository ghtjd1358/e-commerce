import { createBrowserRouter } from "react-router-dom";
import { pageRoutes } from "../apiRouters";

// Pages
import { HomePage } from "../pages/home/index";
import { LoginPage } from "../pages/login/index";
import { RegisterPage } from "../pages/register";
import { CartPage } from "../pages/cart";
import { UserProfilePage } from "../pages/userProfile";
import { PurchasePage } from "../pages/purchase";
import { PurchaseHistoryPage } from "../pages/purchaseHistory";
import { ProfileSettingsPage } from "../pages/profileSettings";
import { ProductListingPage } from "../pages/productListing";
import { ProductListingHistoryPage } from "../pages/productListingHistory";
import { PaymentPage } from "../pages/payment";
import { ErrorPage } from "../pages/error/ErrorPage";
import { NotFoundPage } from "../pages/error/NotFoundPage";
import { CommonLayout } from "./routerLayout";

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
        path: pageRoutes.cart,
        element: <CartPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.userProfile,
        element: <UserProfilePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.purchase,
        element: <PurchasePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.purchaseHistory,
        element: <PurchaseHistoryPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.profileSettings,
        element: <ProfileSettingsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.productListing,
        element: <ProductListingPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.productListingHistory,
        element: <ProductListingHistoryPage />,
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
