import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/admin-sekolah/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardAdminSekolah from "./pages/admin-sekolah/DashboardAdminSekolah";
import DashboardSuperAdmin from "./pages/super-admin/DashboardSuperAdmin";
import SubscriptionPage from "./pages/super-admin/SubscriptionPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/admin-sekolah/dashboard",
    element: <DashboardAdminSekolah />,
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
    path: "/login",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
