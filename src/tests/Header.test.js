import React from 'react';
import renderWithRouter from './renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import FoodsDetails from '../pages/FoodsDetails';
import DrinksDetails from '../pages/DrinksDetails';
import DoneRecipes from '../pages/DoneRecipes';
import DrinksInProgress from '../pages/DrinksInProgress';
import FoodsInProgress from '../pages/FoodsInProgress';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import App from '../App'

describe('Testando os componentes do header', () => {
  test('testando componetes da pagina Foods', () => {
    renderWithRouter(<Foods />);

    const titlePage = screen.getByTestId('page-title');
    const searchButton = screen.getByTestId('search-top-btn');
    const searchProfile = screen.getByTestId('profile-top-btn');
    expect(titlePage).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(searchProfile).toBeInTheDocument();
  });

  test('testando componetes da pagina Drinks', () => {
    renderWithRouter(<Drinks />);

    const titlePage = screen.getByTestId('page-title');
    const searchButton = screen.getByTestId('search-top-btn');
    const searchProfile = screen.getByTestId('profile-top-btn');
    expect(titlePage).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(searchProfile).toBeInTheDocument();
  });

  test('testando componetes da pagina Profile', () => {
    renderWithRouter(<Profile />);

    const titlePage = screen.getByTestId('page-title');
    const searchProfile = screen.getByTestId('profile-top-btn');
    expect(titlePage).toBeInTheDocument();
    expect(searchProfile).toBeInTheDocument();
  });

  test('testando componetes da pagina Foods Details', () => {
    renderWithRouter(<FoodsDetails />);
    const titlePage = screen.getByText(/foodsdetails/i);
    expect(titlePage).toBeInTheDocument();
  });

  test('testando componetes da pagina Drinks Details', () => {
    renderWithRouter(<DrinksDetails />);
    const titlePage = screen.getByText(/drinksdetails/i);
    expect(titlePage).toBeInTheDocument();
  });

  test('testando componetes da pagina Done recipes', () => {
    renderWithRouter(<DoneRecipes />);
    const titlePage = screen.getByRole('heading', { name: /done recipes/i });
    expect(titlePage).toBeInTheDocument();
  });

  test('testando componetes da pagina Drinks progress', () => {
    renderWithRouter(<DrinksInProgress />);
    const titlePage = screen.getByText(/drinksinprogress/i);
    expect(titlePage).toBeInTheDocument();
  });

  test('testando componetes da pagina Done recipes', () => {
    renderWithRouter(<FoodsInProgress />);
    const titlePage = screen.getByText(/foodsinprogress/i);
    expect(titlePage).toBeInTheDocument();
  });

  test('testando componetes da pagina Done recipes', () => {
    renderWithRouter(<FavoriteRecipes />);
    const titlePage = screen.getByRole('heading', {
      name: /favorite recipes/i,
    });
    expect(titlePage).toBeInTheDocument();
  });

  test('testando o input search', () => {
    renderWithRouter(<App />);
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
    renderWithRouter(<Drinks />);

    const searchProfile = screen.getByTestId('profile-top-btn');
    userEvent.click(searchProfile);
    expect(searchProfile.closest('a')).toHaveAttribute('href', '/profile');
  })

  
});
