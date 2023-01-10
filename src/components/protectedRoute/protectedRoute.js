import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
    isLoggedIn,
    redirectPath = '/sign-in',
    children,
  }) => {
    if (!isLoggedIn) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  };

export default ProtectedRoute;