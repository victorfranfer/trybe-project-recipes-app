import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import DoneRecipes from '../pages/DoneRecipes';

describe('Testa o componente DoneRecipes', () => {
  const filterAll = 'filter-by-all-btn';
  const filterFood = 'filter-by-food-btn';
  const filterDrink = 'filter-by-drink-btn';
  const mealCard = 'meal-card';
  const drinkCard = 'drink-card';
  const redirectBtn = 'redirect-food-btn';
  const redirectBtnDrink = 'redirect-drink-btn';

  test('Testa se renderiza o header com o titulo "Done Recipes"', async () => {
    const { getByRole } = renderWithRouterProvider(<DoneRecipes />);
    const title = getByRole('heading', {
      name: /done recipes/i,
    });
    expect(title).toBeInTheDocument();
  });

  test('Testa se renderiza botões de filtros', async () => {
    const { getByTestId } = renderWithRouterProvider(<DoneRecipes />);
    const All = getByTestId(filterAll);
    const Food = getByTestId(filterFood);
    const Drinks = getByTestId(filterDrink);

    expect(All).toBeInTheDocument();
    expect(Food).toBeInTheDocument();
    expect(Drinks).toBeInTheDocument();
  });

  test('Testa funcionalidade dos botões de filtros', async () => {
    const { getByTestId } = renderWithRouterProvider(<DoneRecipes />);
    const All = getByTestId(filterAll);
    const Food = getByTestId(filterFood);
    const Drinks = getByTestId(filterDrink);

    userEvent.click(All);
    expect(getByTestId(mealCard)).toBeInTheDocument();
    expect(getByTestId(drinkCard)).toBeInTheDocument();

    userEvent.click(Food);
    expect(getByTestId(mealCard)).toBeInTheDocument();

    userEvent.click(Drinks);
    expect(getByTestId(drinkCard)).toBeInTheDocument();
  });

  test('Testa redirecionamento ao clicar no nome ou imagem', async () => {
    const { getByTestId, history } = renderWithRouterProvider(<DoneRecipes />);
    const redirect = getByTestId(redirectBtn);

    userEvent.click(redirect);

    expect(history.location.pathname).toBe('/foods/52771');

    const redirectDrink = getByTestId(redirectBtnDrink);

    userEvent.click(redirectDrink);

    expect(history.location.pathname).toBe('/drinks/178319');
  });

  test('Testa botão de compartilhar', () => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
        readText: jest.fn().mockImplementation(() => 'http://localhost:3000/foods/52771'),
      },
    });

    const { getByTestId, getAllByText } = renderWithRouterProvider(<DoneRecipes />);
    const compartilharBtn = getByTestId('0-horizontal-share-btn');

    expect(compartilharBtn).toBeInTheDocument();

    userEvent.click(compartilharBtn);

    const texto = getAllByText('Link copied!');
    expect(texto[0]).toBeInTheDocument();

    const urlCopied = navigator.clipboard.readText();
    expect(urlCopied).toBe('http://localhost:3000/foods/52771');
  });
});