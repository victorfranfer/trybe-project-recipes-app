import React from "react";
import { screen } from "@testing-library/react";
import Foods from '../pages/Foods';
import renderWithRouterProvider from './helper/renderWithRouterProvider';

describe("Validar se os elementos estão na tela", () => {
  it("testa se os botões de categoria são renderizados", () => {
    renderWithRouterProvider(<Foods />);
    const categoryBtn = screen.getAllByRole('button');

    expect(categoryBtn).toHaveLength(7);
  });
});