import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import NewRecipe from "../components/NewRecipe";
import Recipe from "../components/Recipe";

import Coaches from "../components/Coaches";
import Coach from "../components/Coach";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/recipes" exact component={Recipes} />
      <Route path="/recipe" exact component={NewRecipe} />
      <Route path="/recipe/:id" exact component={Recipe} />
      <Route path="/coaches" exact component={Coaches} />
      <Route path="/coach/:id?/:user_id?" exact component={Coach} />
    </Switch>
  </Router>
);