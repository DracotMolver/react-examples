import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouter = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) => {
      isAuthenticated() 
      ? children 
      : (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      );
    }}
  />
);

export default PrivateRouter;
