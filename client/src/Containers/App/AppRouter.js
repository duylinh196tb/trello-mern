import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Home";
import Board from "../Board";

const routes = [
  {
    path: "/",
    component: () => <Home />
  },
  {
    path: "/boards",
    component: () => <Home />
  },
  {
    path: "/boards/:board_id",
    component: () => <Board />
  }
];

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={Board} path="/boards/:boards_id" />
      </Switch>
    );
  }
}

export default AppRouter;
