import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

interface PreventLoggedInProps {
  element: JSX.Element;
}

const PreventLoggedIn: React.FC<PreventLoggedInProps> = ({ element }) => {
  const { token } = useAuth();
  const isAuthorizedUser = !!token;

  if (isAuthorizedUser) {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    ) {
      return <Navigate to="/" />;
    }
  } else if (!isAuthorizedUser) {
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register"
    ) {
      return <Navigate to="/" />;
    }
  }

  return element;
};

export default PreventLoggedIn;
