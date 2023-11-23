import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
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
import HouseholdDashboard from "./pages/HouseholdDashboard";
import { HouseholdProvider } from "./context/HouseholdContext";
import SavingsGoalDashboard from "./pages/SavingsGoalDashboard";
import SavingsGoalDetailsPage from "./pages/SavingsGoalDetailsPage";
import Home from "./pages/Home";
import Expense from "./pages/Expense";
import Bills from "./pages/Bills";
import Settings from "./pages/Settings";
import SettingsLayout from "./layout/SettingsLayout";
import AppearanceForm from "./features/settings/components/AppearanceForm";
import { ThemeProvider } from "./components/theme-provider";
// Defining routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Auth element={<App />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/personal/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/personal/activity",
        element: <Activity />,
      },
      {
        path: "/personal/expenses",
        element: <Expense />,
      },
      {
        path: "/personal/budget",
        element: <Budget />,
      },
      {
        path: "/personal/bills",
        element: <Bills />,
      },
      {
        path: "/settings",
        element: <SettingsLayout />,
        children: [
          {
            path: "/settings/profile",
            element: <Settings />,
          },
          {
            path: "/settings/appearance",
            element: <AppearanceForm />,
          },
        ],
      },
      {
        path: "/personal/goals",
        element: <SavingsGoalDashboard />,
        children: [
          {
            path: "/personal/goals/:goalId",
            element: <SavingsGoalDetailsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/household",
    element: <Auth element={<App />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HouseholdDashboard />,
      },
      {
        path: "/household/activity",
        element: <Activity />,
      },
      {
        path: "/household/budget",
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
    path: "/login",
    // element: <PreventLoggedIn element={<LoginPage />} />,
    element: <LoginPage />,
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
    <Provider store={store}>
      <AccountProvider>
        <AuthProvider>
          <TransactionProvider>
            <HouseholdProvider>
              <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <RouterProvider router={router} />
              </ThemeProvider>
            </HouseholdProvider>
          </TransactionProvider>
        </AuthProvider>
      </AccountProvider>
    </Provider>
  </React.StrictMode>
);
