import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Coaches from "../components/Coaches";
import Coach from "../components/Coach";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/coaches" exact component={Coaches} />
      <Route path="/coach/:id?/:user_id?" exact component={Coach} />
    </Switch>
  </Router>
);