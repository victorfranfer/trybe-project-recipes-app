import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import useFavoritesLocalStorage from '../hooks/useFavoritesLocalStorage';
import favoriteHeart from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const history = useHistory();
  const {
    recoveredFavorites,
    removeFavorite,
  } = useFavoritesLocalStorage();

  const [mealsMade, setMealsMade] = useState('');

  useEffect(() => {
    setMealsMade(recoveredFavorites);
  }, [recoveredFavorites]);

  const shareUrl = (value) => {
    const url = `http://localhost:3000/foods/${recoveredFavorites[value].id}`;
    navigator.clipboard.writeText(url);
    const snackbar = document.getElementsByClassName('snackbar')[value];
    snackbar.style.display = 'block';
  };

  const filtros = (value) => {
    let data = recoveredFavorites;
    if (value === 'food') {
      data = recoveredFavorites.filter((meal) => meal.type === 'food');
    }
    if (value === 'drink') {
      data = recoveredFavorites.filter((meal) => meal.type === 'drink');
    }
    setMealsMade(data);
  };

  return (
    <section>
      <Header pageTitle="Favorite Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ (e) => filtros(e.target.value) }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        value="food"
        onClick={ (e) => filtros(e.target.value) }
      >
        Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ (e) => filtros(e.target.value) }
      >
        Drinks
      </button>

      <div>
        { mealsMade && mealsMade.map((recipe, index) => (

          recipe.type === 'food' ? (
            <div
              data-testid="meal-card"
              key={ recipe.id }
            >
              <button
                type="button"
                data-testid="redirect-food-btn"
                onClick={ () => history.push(`/foods/${recipe.id}`) }
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                  style={ { width: '40%', height: '40%' } }

                />

                <h4
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </h4>
              </button>

              <h5
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.nationality} - ${recipe.category}`}
              </h5>
              <button
                type="button"
                onClick={ () => shareUrl(index) }
              >
                <img
                  src={ shareIcon }
                  alt="share"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>

              <button
                type="button"
                onClick={ () => removeFavorite(recipe.id) }
              >
                <img
                  alt="FavoriteHeart"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ favoriteHeart }
                />
              </button>

              <p
                className="snackbar"
                style={ { display: 'none' } }
              >
                Link copied!

              </p>

            </div>
          ) : (
            <div
              data-testid="drink-card"
              key={ recipe.id }
            >
              <button
                type="button"
                data-testid="redirect-drink-btn"
                onClick={ () => history.push(`/drinks/${recipe.id}`) }
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                  style={ { width: '40%', height: '40%' } }
                />

                <h4
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </h4>
              </button>
              <h5
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}
              </h5>

              <button
                type="button"
                onClick={ () => shareUrl(index) }
              >
                <img
                  src={ shareIcon }
                  alt="share"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              <button
                type="button"
                onClick={ () => removeFavorite(recipe.id) }
              >
                <img
                  alt="FavoriteHeart"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ favoriteHeart }
                />
              </button>
              <p
                className="snackbar"
                style={ { display: 'none' } }
              >
                Link copied!

              </p>
            </div>

          )

        ))}
      </div>
    </section>
  );
}

export default FavoriteRecipes;
