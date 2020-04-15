import React from "react";
import { Route, Redirect } from "react-router-dom";
// project
import { getUserData } from "./../../functions";

const PrivateRouter = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) => {
      console.log(getUserData());
      // isAuthenticated()
      return true ? (
        children
      ) : (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      );
    }}
  />
);

export default PrivateRouter;
