import React from "react";
import { Switch, Route, useRouteMatch, NavLink } from "react-router-dom";
import { AddBook } from "./AddBook";
import { AddAuthor } from "./AddAuthor";
import "./Admin.scss";
import { useTranslation } from "react-i18next";

export const Admin = (props) => {
  let { path, url } = useRouteMatch();

  const { t } = useTranslation();

  return (
    <div className="admin" data-testid="admin">
      <ul>
        <li>
          <NavLink to={`${url}/add-book`}>{t("admin.link.addBook")}</NavLink>
        </li>
        <li>
          <NavLink to={`${url}/add-author`}>{t("admin.link.addAuthor")}</NavLink>
        </li>
      </ul>
      <Switch>
        <Route path={`${path}/add-book`}>
          <AddBook />
        </Route>
        <Route path={`${path}/add-author`}>
          <AddAuthor />
        </Route>
      </Switch>
    </div>
  );
};
