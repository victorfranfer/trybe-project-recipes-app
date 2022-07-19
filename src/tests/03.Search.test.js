import React from 'react';
import { screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import responseDrinks from './mockdrinks';
import Drinks from '../pages/Drinks';

describe('verifica o componenete Search.js', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(responseDrinks)
    }));
  })

  afterEach(() => jest.clearAllMocks());

  test('verifica os elementos do componente', () => {
    renderWithRouterProvider(<Drinks />);

    const button = screen.getByTestId('search-top-btn');
    expect(button).toBeInTheDocument();
    
    userEvent.click(button);

    const radio1 = screen.getByTextId('ingredient-search-radio');
    const radio2 = screen.getByTextId('name-search-radio');
    const radio3 = screen.getByTextId('first-letter-search-radio');
    const buttonSearch = screen.getByTextId('exec-search-btn');

    expect(radio1).toBeInTheDocument();
    expect(radio2).toBeInTheDocument();
    expect(radio3).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
  });
  test('verifica se ao fizer busca renderiza resultados', () => {
    renderWithRouterProvider(<Drinks />);

    const searchBtn = screen.getByTestId('search-top-btn');
    

    userEvent.click(searchBtn);
    const input = screen.getByTestId('search-input');

    expect(input).toBeInTheDocument();
    userEvent.type(input, 'margarita');
    const buttonSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(buttonSearch);
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(responseDrinks)
    }));

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
  });
})
