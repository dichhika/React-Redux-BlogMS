import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const isAuthenticated = token || localStorage.getItem("jwt");

  if (!isAuthenticated) {
    alert("Please login first!");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
