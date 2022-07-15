import React from "react";
import { screen } from "@testing-library/react";
import { waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Foods from '../pages/Foods';
import renderWithRouter from "./renderWithRouter";

describe("Validar se os elementos estão na tela", () => {
  beforeEach(cleanup);
  it("testa se os elementos são renderizados", () => {
    renderWithRouter(<Foods />);
    const footer = screen.getByTestId('footer');
    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    const mealIcon = screen.getByTestId('food-bottom-btn');

    expect(footer).toBeInTheDocument();
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });
});