import React from 'react';
import { screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import Drinks from '../pages/Drinks';

describe('verifica o componenete Search.js', () => {
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
  })
})