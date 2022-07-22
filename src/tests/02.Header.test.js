import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import RecipeDetails from '../pages/RecipeDetails';
import DoneRecipes from '../pages/DoneRecipes';
import RecipeInProgress from '../pages/RecipesInProgress';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import App from '../App'
import renderWithRouterProvider from './helper/renderWithRouterProvider';

describe('Testando os componentes do header', () => {
  test('testando componetes da pagina Foods', () => {
    renderWithRouterProvider(<Foods />);

    const titlePage = screen.getByTestId('page-title');
    const searchButton = screen.getByTestId('search-top-btn');
    const searchProfile = screen.getByTestId('profile-top-btn');
    expect(titlePage).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(searchProfile).toBeInTheDocument();
  });

  test('testando componetes da pagina Drinks', () => {
    renderWithRouterProvider(<Drinks />);

    const titlePage = screen.getByTestId('page-title');
    const searchButton = screen.getByTestId('search-top-btn');
    const searchProfile = screen.getByTestId('profile-top-btn');
    expect(titlePage).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(searchProfile).toBeInTheDocument();
  });

  test('testando componetes da pagina Profile', () => {
    renderWithRouterProvider(<Profile />);

    const titlePage = screen.getByTestId('page-title');
    const searchProfile = screen.getByTestId('profile-top-btn');
    expect(titlePage).toBeInTheDocument();
    expect(searchProfile).toBeInTheDocument();
  });

  // test('testando componetes da pagina Foods Details', () => {
  //   renderWithRouterProvider(<RecipeDetails />);
  //   const titlePage = screen.getByText(/foodsdetails/i);
  //   expect(titlePage).toBeInTheDocument();
  // });

  // test('testando componetes da pagina Drinks Details', () => {
  //   renderWithRouterProvider(<RecipeDetails />);
  //   const titlePage = screen.getByText(/drinksdetails/i);
  //   expect(titlePage).toBeInTheDocument();
  // });

  test('testando componetes da pagina Done recipes', () => {
    renderWithRouterProvider(<DoneRecipes />);
    const titlePage = screen.getByRole('heading', { name: /done recipes/i });
    expect(titlePage).toBeInTheDocument();
  });

  // test('testando componetes da pagina Drinks progress', () => {
  //   renderWithRouterProvider(<RecipeInProgress />);
  //   const titlePage = screen.getByText(/drinksinprogress/i);
  //   expect(titlePage).toBeInTheDocument();
  // });

  // test('testando componetes da pagina Done recipes', () => {
  //   renderWithRouterProvider(<RecipeInProgress />);
  //   const titlePage = screen.getByText(/foodsinprogress/i);
  //   expect(titlePage).toBeInTheDocument();
  // });

  test('testando componetes da pagina Done recipes', () => {
    renderWithRouterProvider(<FavoriteRecipes />);
    const titlePage = screen.getByRole('heading', {
      name: /favorite recipes/i,
    });
    expect(titlePage).toBeInTheDocument();
  });

  test('testando o input search', () => {
    renderWithRouterProvider(<App />);
    const input = screen.getByTestId("email-input");
    const password = screen.getByTestId("password-input");
    const submitBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(input, "lucasfpnt@gmail.com");
    userEvent.type(password, "1234567");
    userEvent.click(submitBtn)

    const searchField = screen.getByTestId('search-top-btn')
    userEvent.click(searchField)

    const searchBar = screen.getByTestId('search-input')
    expect(searchBar).toBeInTheDocument()
    userEvent.click(searchField)
    expect(searchBar).not.toBeInTheDocument()
  });

  test('Verifica se o header leva para a página profile', () => {
    renderWithRouterProvider(<Drinks />);

    const searchProfile = screen.getByTestId('profile-top-btn');
    userEvent.click(searchProfile);
    expect(searchProfile.closest('a')).toHaveAttribute('href', '/profile');
  });

  test('Verifica se o campo input aparece quando o botão search-top-btn é clicado', () => {
    renderWithRouterProvider(<Drinks />);

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  
});
