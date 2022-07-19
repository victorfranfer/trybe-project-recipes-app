import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { RecipesProvider } from '../../context/RecipesContext';

const renderWithRouterProvider = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(
      <RecipesProvider>
        <Router history={ history }>{component}</Router>
        ,
      </RecipesProvider>,
    ),
    history,
  };
};

export default renderWithRouterProvider;
