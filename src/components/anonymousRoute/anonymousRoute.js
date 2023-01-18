import React from "react";
import { Navigate } from "react-router-dom";

const AnonymousRoute = ({
    redirectPath = '/',
    children,
  }) => {
    if (localStorage.getItem('jwt')) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  };

export default AnonymousRoute;