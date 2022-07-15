import React from 'react';
import renderWithRouter from './renderWithRouter';
import { cleanup, screen } from '@testing-library/react';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import FoodsDetails from '../pages/FoodsDetails';
import DrinksDetails from '../pages/DrinksDetails';
import DoneRecipes from '../pages/DoneRecipes';
import DrinksInProgress from '../pages/DrinksInProgress';
import FoodsInProgress from '../pages/FoodsInProgress';
import FavoriteRecipes from '../pages/FavoriteRecipes';

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
});
