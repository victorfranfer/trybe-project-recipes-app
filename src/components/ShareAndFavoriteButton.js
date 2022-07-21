import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getRecipeFromLocalStorage,
  setRecipeInLocalStorage,
} from '../services/localStorage';
import favoriteHeart from '../images/blackHeartIcon.svg';
import unFavoriteHeart from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

export default function ShareAndFavoriteButton({ recipe, idDaReceita }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [favoriteRecipesOnLocalStorage, setFavoriteRecipesOnLocalStorage] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getFavoritesRecipes = getRecipeFromLocalStorage('favoriteRecipes');
    if (getFavoritesRecipes.length > 0) {
      setFavoriteRecipesOnLocalStorage(getFavoritesRecipes);
      if (
        getFavoritesRecipes.some(
          (favoriteRecipe) => favoriteRecipe.id === idDaReceita,
        )
      ) {
        setIsFavorite(true);
      }
    }
  }, [idDaReceita]);

  const handleCopy = () => {
    const threeSeconds = 3000;
    if (history.location.pathname.includes('foods')) {
      copy(`http://localhost:3000/foods/${idDaReceita}`);
    } else {
      copy(`http://localhost:3000/drinks/${idDaReceita}`);
    }
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, threeSeconds);
  };

  const handleFavorite = () => {
    if (isFavorite) {
      const favoriteRecipesUpdate = favoriteRecipesOnLocalStorage.filter(
        (favoriteRecipe) => favoriteRecipe.id !== idDaReceita,
      );
      setRecipeInLocalStorage('favoriteRecipes', favoriteRecipesUpdate);
      setIsFavorite(false);
    } else {
      const favoriteRecipesUpdate = [
        ...favoriteRecipesOnLocalStorage,
        {
          id: recipe?.idDrink || recipe?.idMeal,
          type: recipe?.strAlcoholic ? 'drink' : 'food',
          nationality: recipe?.strArea || '',
          category: recipe?.strCategory || '',
          alcoholicOrNot: recipe?.strAlcoholic || '',
          name: recipe?.strDrink || recipe?.strMeal,
          image: recipe?.strDrinkThumb || recipe?.strMealThumb,
        },
      ];
      setRecipeInLocalStorage('favoriteRecipes', favoriteRecipesUpdate);
      setIsFavorite(true);
    }
  };
  return (
    <>
      <button type="button" data-testid="share-btn" onClick={ handleCopy }>
        Share
      </button>
      <button type="button" onClick={ handleFavorite }>
        <img
          alt={ isFavorite ? 'FavoriteHeart' : 'unFavoriteHeart' }
          data-testid="favorite-btn"
          src={ isFavorite ? favoriteHeart : unFavoriteHeart }
        />
      </button>
      {isCopied && (
        <span style={ { color: 'red', margin: '15px' } }>Link copied!</span>
      )}
    </>
  );
}

ShareAndFavoriteButton.propTypes = {
  recipe: PropTypes.shape(),
  idDaReceita: PropTypes.string,
}.isRequired;
