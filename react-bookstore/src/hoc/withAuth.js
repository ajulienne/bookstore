import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

/**
 * Higher Order Component pour ajouter une protection de login sur un composant
 * @param {*} Component Composant à protéger
 * @param {*} redirect Route de redirection après le login effectué
 */
export const withAuth = (Component, redirect) => (props) => {
  const loggedUser = useSelector((state) => state.authReducer.loggedUser);
  const history = useHistory();

  useEffect(() => {
    if (!loggedUser) {
      history.replace({
        pathname: "/login",
        state: { redirect },
      });
    }
  }, [loggedUser, history]);

  return loggedUser ? <Component {...props} /> : null;
};
