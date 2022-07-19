import React from "react";
import { screen } from "@testing-library/react";
import Foods from '../pages/Foods';
import renderWithRouterProvider from './helper/renderWithRouterProvider';

describe("Validar se os elementos estão na tela", () => {
  it("testa se os elementos são renderizados", () => {
    renderWithRouterProvider(<Foods />);
    const footer = screen.getByTestId('footer');
    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    const mealIcon = screen.getByTestId('food-bottom-btn');

    expect(footer).toBeInTheDocument();
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });
});