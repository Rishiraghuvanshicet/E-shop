import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    toast.warn("Please login first to access the Shop page.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
