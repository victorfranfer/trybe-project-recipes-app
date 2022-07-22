import React from 'react';
import { screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import mockFetch from './mocks/mockFetch';
import { dataResponseCategories, dataResponseDrinks, dataResponseMeals } from './mocks/dataResponseApi';
import App from '../App';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Foods from '../pages/Foods';

global.alert = jest.fn();
afterEach(cleanup)

describe('verifica o componente searchbar', () => {
  const testIdIngredientSearch = 'ingredient-search-radio';
  const testIdNameSearch = 'name-search-radio';
  const testIdFirstLetterSearch = 'first-letter-search-radio';
  const testIdBtnExecSearch = 'exec-search-btn';
  const testIdInputSearch = 'search-input';
  const testIdSearchTopBtn = 'search-top-btn';

  afterEach(cleanup);

  it('1 - testa renderização dos botões', async () => {
    renderWithRouterProvider(<SearchBar />);

    // const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    // userEvent.click(searchTopBtn);
    const btnExecSearch = screen.getByTestId(testIdBtnExecSearch);
    const ingredientSearch = screen.getByTestId(testIdIngredientSearch);
    const nameSearch = screen.getByTestId(testIdNameSearch);
    const firstLetterSearch = screen.getByTestId(testIdFirstLetterSearch);
    expect(btnExecSearch).toBeInTheDocument();
    expect(ingredientSearch).toBeInTheDocument();
    expect(nameSearch).toBeInTheDocument();
    expect(firstLetterSearch).toBeInTheDocument();
  });
  it('2- Testa se não existe mais de uma categoria selecionada', () => {
    renderWithRouterProvider(<SearchBar />);
    const ingredientSearch = screen.getByLabelText(/ingredient/i);
    const nameSearch = screen.getByLabelText(/name/i);
    const letterSearch = screen.getByLabelText(/first letter/i);
    userEvent.click(ingredientSearch);
    expect(ingredientSearch).toBeChecked();
    expect(nameSearch).not.toBeChecked();
    expect(letterSearch).not.toBeChecked();
    userEvent.click(nameSearch);
    expect(ingredientSearch).not.toBeChecked();
    expect(nameSearch).toBeChecked();
    expect(letterSearch).not.toBeChecked();
    userEvent.click(letterSearch);
    expect(ingredientSearch).not.toBeChecked();
    expect(nameSearch).not.toBeChecked();
    expect(letterSearch).toBeChecked();
  });
  it(`3- Testa se ao selecionar ingredientes
  a requisição é feita corretamente ao endpoint`, async () => {
    mockFetch(dataResponseMeals.multiplesMeals);
    renderWithRouterProvider(<Header  />);
    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    userEvent.click(searchTopBtn);
    const ingredientSearch = screen.getByLabelText(/ingredient/i);
    const btnSearch = screen.getByTestId(testIdBtnExecSearch);
    const inputSearch = screen.getByTestId(testIdInputSearch);
    userEvent.click(ingredientSearch);
    userEvent.type(inputSearch, 'chicken');
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
    });
  });
  it(`4- Testa se ao selecionar name
  a requisição é feita corretamente ao endpoint`, async () => {
    mockFetch(dataResponseMeals.multiplesMeals);
    renderWithRouterProvider(<Header  />);
    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    userEvent.click(searchTopBtn);
    const nameSearch = screen.getByLabelText(/name/i);
    const btnSearch = screen.getByTestId(testIdBtnExecSearch);
    const inputSearch = screen.getByTestId(testIdInputSearch);
    userEvent.type(inputSearch, 'rice');
    userEvent.click(nameSearch);
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=rice');
    });
  });

  it(`5- Testa se ao selecionar first letter
  a requisição é feita corretamente ao endpoint`, async () => {
    mockFetch(dataResponseMeals.multiplesMeals);
    renderWithRouterProvider(<Header  />);
    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    userEvent.click(searchTopBtn);
    const firstLetterSearch = screen.getByLabelText(/first letter/i);
    const btnSearch = screen.getByTestId(testIdBtnExecSearch);
    const inputSearch = screen.getByTestId(testIdInputSearch);
    userEvent.type(inputSearch, 'a');
    userEvent.click(firstLetterSearch);
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
    });
  });

  it(`6- Testa se ao selecionar first letter
  a e colocar mais de uma letra o alerta é mostrado`, async () => {
    window.alert = jest.fn();
    mockFetch(dataResponseMeals.multiplesMeals);
    renderWithRouterProvider(<Header />);
    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    userEvent.click(searchTopBtn);
    const firstLetterSearch = screen.getByLabelText(/first letter/i);
    const btnSearch = screen.getByTestId(testIdBtnExecSearch);
    const inputSearch = screen.getByTestId(testIdInputSearch);
    userEvent.type(inputSearch, 'aa');
    userEvent.click(firstLetterSearch);
    userEvent.click(btnSearch);
    await waitFor(() => {
      window.alert.mockClear();
    });
  });
  it(`7- Testa se a requisição é feita corretamente
  quando estiver na rota /drinks`, async () => {
    mockFetch(dataResponseDrinks.multipleDrinks);
    const { history } = renderWithRouterProvider(<Header />);
    history.push('/drinks');
    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    userEvent.click(searchTopBtn);
    const firstLetterSearch = screen.getByLabelText(/first letter/i);
    const btnSearch = screen.getByTestId(testIdBtnExecSearch);
    const inputSearch = screen.getByTestId(testIdInputSearch);
    userEvent.type(inputSearch, 'a');
    userEvent.click(firstLetterSearch);
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(global.fetch).toBeCalledTimes(1);
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
      global.fetch.mockClear();
    });
  });
  it(`8- Testa se ao fazer a requisição com filtro no ingrediente e for retornado somente
  uma receita a rota e redirecionada para /foods/idreceita`, async () => {
    mockFetch(dataResponseMeals.singleMeal);
    const { history } = renderWithRouterProvider(<Foods />);
    history.push('/foods');
    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    userEvent.click(searchTopBtn);
    const nameSearch = await screen.findByLabelText(/name/i);
    const btnSearch = await screen.findByTestId(testIdBtnExecSearch);
    const inputSearch = await screen.findByTestId(testIdInputSearch);
    userEvent.type(inputSearch, 'chicken');
    userEvent.click(nameSearch);
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(history.location.pathname).toBe('/foods/52940');
      global.fetch.mockClear();
    });
  });
  it(`9- Testa se deixar o campo de input vazio e tentar
    buscar nenhuma chamada a api é realizada`, async () => {
    mockFetch(dataResponseDrinks.singleDrink);
    const { history } = renderWithRouterProvider(<Header />);
    history.push('/drinks');
    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    userEvent.click(searchTopBtn);
    const ingredientSearch = screen.getByLabelText(/ingredient/i);
    const btnSearch = screen.getByTestId(testIdBtnExecSearch);
    userEvent.click(ingredientSearch);
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(global.fetch).not.toBeCalled();
      expect(global.fetch).not.toBeCalledTimes(1);
      global.fetch.mockClear();
    });
  });
  it(`10- Testa se nenhuma receita for encontrada
    um alert e exibido`, async () => {
    window.alert = jest.fn();
    mockFetch({ drinks: null });
    const { history } = renderWithRouterProvider(<SearchBar pageTitle="drinks" />);
    history.push('/drinks');
    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    userEvent.click(searchTopBtn);
    const ingredientSearch = screen.getByLabelText(/ingredient/i);
    const btnSearch = screen.getByTestId(testIdBtnExecSearch);
    const inputSearch = screen.getByTestId(testIdInputSearch);
    userEvent.type(inputSearch, 'ronaldo');
    userEvent.click(ingredientSearch);
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(window.alert).toBeCalled();
      expect(window.alert).toBeCalledTimes(1);
    });
  });
})
