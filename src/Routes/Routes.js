import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import { LoginProvider } from '../context/Login/LoginContext';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import DoneRecipes from '../pages/DoneRecipes';
import FoodsDetails from '../pages/FoodsDetails';
import DrinksDetails from '../pages/DrinksDetails';
import FoodsInProgress from '../pages/FoodsInProgress';
import DrinksInProgress from '../pages/DrinksInProgress';

const Routes = () => (
  <LoginProvider>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods/{id-da-receita}" component={ FoodsDetails } />
      <Route exact path="/drinks/{id-da-receita}" component={ DrinksDetails } />
      <Route path="/profile" component={ Profile } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/foods/{id-da-receita}/in-progress" component={ FoodsInProgress } />
      <Route path="/drinks/{id-da-receita}/in-progress" component={ DrinksInProgress } />
    </Switch>
  </LoginProvider>
);

export default Routes;
