import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import DoneRecipes from '../pages/DoneRecipes';
import RecipeDetails from '../pages/RecipeDetails';
import RecipesInProgress from '../pages/RecipesInProgress';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/foods" component={ Foods } />
    <Route exact path="/drinks" component={ Drinks } />
    <Route exact path="/foods/:idDaReceita" component={ RecipeDetails } />
    <Route exact path="/drinks/:idDaReceita" component={ RecipeDetails } />
    <Route exact path="/profile" component={ Profile } />
    <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    <Route exact path="/done-recipes" component={ DoneRecipes } />
    <Route
      exact
      path="/foods/:idDaReceita/in-progress"
      component={ RecipesInProgress }
    />
    <Route
      exact
      path="/drinks/:idDaReceita/in-progress"
      component={ RecipesInProgress }
    />
  </Switch>
);

export default Routes;
