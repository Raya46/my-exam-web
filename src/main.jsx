import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/admin-sekolah/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardAdminSekolah from "./pages/admin-sekolah/DashboardAdminSekolah";
import SubscriptionPage from "./pages/super-admin/SubscriptionPage";
import RegisterPage from "./pages/RegisterPage";
import LinkPage from "./pages/admin-sekolah/LinkPage";
import MonitoringPage from "./pages/admin-sekolah/MonitoringPage";
import DashboardSuperAdmin from "./pages/super-admin/DashboardSuperAdmin";
import ListPaymentPage from "./pages/super-admin/ListPaymentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/admin-sekolah/subscription",
    element: <HomePage />,
  },
  {
    path: "/admin-sekolah/dashboard",
    element: <DashboardAdminSekolah />,
  },
  {
    path: "/admin-sekolah/link",
    element: <LinkPage />,
  },
  {
    path: "/admin-sekolah/monitoring",
    element: <MonitoringPage />,
  },
  {
    path: "/super-admin/dashboard",
    element: <DashboardSuperAdmin />,
  },
  {
    path: "/super-admin/subscription",
    element: <SubscriptionPage />,
  },
  {
    path: "/super-admin/list-pay",
    element: <ListPaymentPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
