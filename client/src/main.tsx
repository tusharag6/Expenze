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
// Defining routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
