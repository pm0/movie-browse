import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import ActorPage from "./pages/ActorPage";
import "./App.scss";

function AppRouter() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/movie/:id">
            <MoviePage />
          </Route>
          <Route exact path="/actor/:id">
            <ActorPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default AppRouter;
