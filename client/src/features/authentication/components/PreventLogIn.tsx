import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

interface PreventLoggedInProps {
  element: JSX.Element;
}

const PreventLoggedIn: React.FC<PreventLoggedInProps> = ({ element }) => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PreventLoggedIn;
