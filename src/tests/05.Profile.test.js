import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Profile from '../pages/Profile';
import renderWithRouterProvider from './helper/renderWithRouterProvider';

describe("Validar se os elementos estão na tela", () => {
  it("testa se os elementos são renderizados", () => {
    renderWithRouterProvider(<Profile />);
    const pageTitle = screen.getByTestId('page-title');
    const profileEmail = screen.getByTestId('profile-email');
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
    const logoutButton = screen.getByTestId('profile-logout-btn');

    expect(pageTitle).toBeInTheDocument();
    expect(profileEmail).toBeInTheDocument();
    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoriteRecipesBtn).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
  it("testa o botão Done Recipes", async () => {
    const { history } = renderWithRouterProvider(<Profile />);
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');

    userEvent.click(doneRecipesBtn);

    await waitFor(() => expect(history.location.pathname).toBe('/done-recipes'));
  });
  it("testa o botão Favorite Recipes", async () => {
    const { history } = renderWithRouterProvider(<Profile />);
    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');

    userEvent.click(favoriteRecipesBtn);

    await waitFor(() => expect(history.location.pathname).toBe('/favorite-recipes'));
  });
  it("testa o botão Logout", async () => {
    const { history } = renderWithRouterProvider(<Profile />);
    const logoutButton = screen.getByTestId('profile-logout-btn');
    
    userEvent.click(logoutButton);
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  })
});