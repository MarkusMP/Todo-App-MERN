import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";

const ProtectedRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return loggedIn ? <Component {...props} /> : <Home />;
      }}
    />
  );
};

export default ProtectedRoute;
