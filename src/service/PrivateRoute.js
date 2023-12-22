import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
  const user = localStorage.getItem("userrole");
  if (user === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
