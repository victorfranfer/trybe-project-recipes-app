import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import DoneRecipes from '../pages/DoneRecipes';
import RecipeDetails from '../pages/RecipeDetails';
import FoodsInProgress from '../pages/FoodsInProgress';
import DrinksInProgress from '../pages/DrinksInProgress';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/foods" component={ Foods } />
    <Route exact path="/drinks" component={ Drinks } />
    <Route exact path="/foods/:id_da_receita" component={ RecipeDetails } />
    <Route exact path="/drinks/:id_da_receita" component={ RecipeDetails } />
    <Route path="/profile" component={ Profile } />
    <Route path="/favorite_recipes" component={ FavoriteRecipes } />
    <Route path="/done_recipes" component={ DoneRecipes } />
    <Route
      path="/foods/:id_da_receita/in-progress"
      component={ FoodsInProgress }
    />
    <Route
      path="/drinks/:id_da_receita/in_progress"
      component={ DrinksInProgress }
    />
  </Switch>
);

export default Routes;
