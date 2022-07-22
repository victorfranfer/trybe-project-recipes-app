import React from 'react';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testa o componente Favorite Recipes', () => {
  test('Testa se renderiza o header com o titulo "FavoriteRecipes"', async () => {
    const { getByRole } = renderWithRouterProvider(<FavoriteRecipes />);
    const title = getByRole('heading', {
      name: /Favorite Recipes/i,
    });
    expect(title).toBeInTheDocument();
  });
});