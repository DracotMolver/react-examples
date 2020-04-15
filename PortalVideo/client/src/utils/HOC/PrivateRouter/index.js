import React from "react";
import { Route, Redirect } from "react-router-dom";
import { is } from "quartzjs";
// project
import { getUserData } from "./../../functions";

const PrivateRouter = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      is.truthty(getUserData()) ? (
        children
      ) : (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      )
    }
  />
);

export default PrivateRouter;
