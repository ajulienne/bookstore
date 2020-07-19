import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import { Admin } from "./components/Admin/Admin";
import { Books } from "./components/Books/Books";
import { NavBar } from "./components/NavBar";
import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Switch>
          <Redirect exact from="/" to="/books" />
          <Route path="/books">
            <Books />
          </Route>
          <ProtectedRoute path="/admin">
            <Admin />
          </ProtectedRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
