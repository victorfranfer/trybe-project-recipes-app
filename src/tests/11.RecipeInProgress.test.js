import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import RecipeInProgress from '../pages/RecipeInProgress';
import mockFetch from './mocks/mockFetch';
import dataResponseDetails from './mocks/dataResponseDetails';

describe('Testa o componente RecipeInProgress', () => {
  test('Testa se renderiza o header com o titulo "Receita em Progresso"', async () => {
    mockFetch(dataResponseDetails.drink);
    const {
      getByRole,
      findByText,
    } = renderWithRouterProvider(
      <RecipeInProgress match={ { params: 15997, url: '/drinks/15997' } } />,
    );
    const title = getByRole('heading', {
      name: /Pagina de Receita em Andamento/i,
    });
    expect(title).toBeInTheDocument();
    const recipeTitle = await findByText(/GG/i);
    expect(recipeTitle).toBeInTheDocument();
  });

  test('Testa se se é possivel checar um ingredient e deschecar', async () => {
    mockFetch(dataResponseDetails.drink);
    const {
      findByText,
    } = renderWithRouterProvider(
      <RecipeInProgress match={ { params: 15997, url: 'drinks/15997/in-progress' } } />,
      { route: 'drinks/15997/in-progress' },
    );
    const recipeTitle = await findByText(/GG/i);
    const ingredientOne = await findByText(/galliano 2 1\/2 shots/i);
    expect(recipeTitle).toBeInTheDocument();
    expect(ingredientOne).toBeInTheDocument();
    userEvent.click(ingredientOne);
    userEvent.click(ingredientOne);
  });

  test(`Testa se ao checar todos os ingredients o botão Finish
   é habilitado`, async () => {
    mockFetch(dataResponseDetails.drink);
    const {
      findByText,
      findByRole,
    } = renderWithRouterProvider(
      <RecipeInProgress match={ { params: 15997, url: 'drinks/15997/in-progress' } } />,
      { route: 'drinks/15997/in-progress' },
    );
    const buttonFinish = await findByRole('button', {
      name: /finish recipe/i,
    });
    expect(buttonFinish).toBeInTheDocument();
    expect(buttonFinish).toBeDisabled();
    const ingredientOne = await findByText(/galliano 2 1\/2 shots/i);
    const ingredientTwo = await findByText(/ginger ale null/i);
    const ingredientThree = await findByText(/ice null/i);
    userEvent.click(ingredientOne);
    userEvent.click(ingredientTwo);
    userEvent.click(ingredientThree);
    userEvent.click(buttonFinish);
  });
});