import React from "react";
import { Navigate } from "react-router-dom";
import LocalStorageUtil from "../../utils/LocalStorageUtil";

const ProtectedRoute = ({
    redirectPath = '/',
    children,
  }) => {
    if (!LocalStorageUtil.getJwt()) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  };

export default ProtectedRoute;