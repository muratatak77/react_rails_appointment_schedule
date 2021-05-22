import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import NewRecipe from "../components/NewRecipe";
import Recipe from "../components/Recipe";




export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/recipes" exact component={Recipes} />
      <Route path="/recipe" exact component={NewRecipe} />
      <Route path="/recipe/:id" exact component={Recipe} />
    </Switch>
  </Router>
);