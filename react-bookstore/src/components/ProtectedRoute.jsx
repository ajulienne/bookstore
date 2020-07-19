import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = (props) => {
  const loggedUser = useSelector((state) => state.authReducer.loggedUser);

  return loggedUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: {
          redirect: props.path,
          errorMessage: "login.errorMessages.mustBeLoggedIn",
        },
      }}
    />
  );
};
