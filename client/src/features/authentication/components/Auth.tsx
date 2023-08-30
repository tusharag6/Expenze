import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

interface RequireAuthProps {
  element: JSX.Element;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ element }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default RequireAuth;
