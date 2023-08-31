import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./layout/ErrorPage";
import App from "./App";

import Activity from "./pages/Activity";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import Auth from "./features/authentication/components/Auth";
import PreventLoggedIn from "./features/authentication/components/PreventLogIn";
import VerifyPage from "./pages/VerifyPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import { AccountProvider } from "./context/AccountContext";
import { TransactionProvider } from "./context/TransactionContext";
import Budget from "./pages/Budget";
// Defining routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth element={<App />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "/activity",
        element: <Activity />,
      },
      {
        path: "/budget",
        element: <Budget />,
      },
    ],
  },
  {
    path: "/register",
    element: <PreventLoggedIn element={<RegisterPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    index: true,
    path: "/login",
    element: <PreventLoggedIn element={<LoginPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/verify/:token",
    element: <VerifyPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password/:token",
    element: <ChangePasswordPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AccountProvider>
      <AuthProvider>
        <TransactionProvider>
          <RouterProvider router={router} />
        </TransactionProvider>
      </AuthProvider>
    </AccountProvider>
  </React.StrictMode>
);
