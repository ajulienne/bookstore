import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { BookList } from "./BookList";
import { BookDetail } from "./BookDetail";

export const Books = (props) => {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <BookList />
        </Route>
        <Route path={`${path}/:id`}>
          <BookDetail />
        </Route>
      </Switch>
    </div>
  );
};
