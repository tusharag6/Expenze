import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import App from "./App";

import Activity from "./pages/Activity";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import Auth from "./components/Auth";
import PreventLoggedIn from "./components/PreventLogIn";
import VerifyPage from "./pages/VerifyPage";
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
    ],
  },
  {
    path: "/register",
    element: <PreventLoggedIn element={<RegisterPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <PreventLoggedIn element={<LoginPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/verify/:token",
    element: <VerifyPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
