import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ShareAndFavoriteButton from '../components/ShareAndFavoriteButton';
import { requestDetails } from '../services/index';
import getIngredientsAndMeasures from '../services/getIngredients';

export default function RecipeInProgress({
  match: {
    params: { idDaReceita },
    url,
  },
}) {
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredient] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    const getRecipe = async () => {
      const recipeDetails = url.includes('foods')
        ? await requestDetails.food(idDaReceita)
        : await requestDetails.drink(idDaReceita);
      if (url.includes('foods')) {
        setRecipe(recipeDetails.meals[0]);
      } else {
        setRecipe(recipeDetails.drinks[0]);
      }
    };
    getRecipe();
  }, [idDaReceita, url]);

  useEffect(() => {
    const { ingredients: ingredientsFiltered, measures: measuresFiltered,
    } = getIngredientsAndMeasures(recipe);
    setIngredient(ingredientsFiltered);
    setMeasures(measuresFiltered);
  }, [recipe]);

  return (
    <div>
      <h3>Pagina de Receita em Andamento</h3>
      <img
        style={ { width: '100%' } }
        alt={ recipe.strMeal || recipe.strDrink }
        src={ recipe.strDrinkThumb || recipe.strMealThumb }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h2>
      <ShareAndFavoriteButton recipe={ recipe } idDaReceita={ idDaReceita } />
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      {recipe?.strAlcoholic && <p>{recipe.strAlcoholic}</p>}
      <ul style={ { listStyle: 'none' } }>
        {ingredients?.length > 0
          && ingredients.map((ingredient, index) => (
            <li key={ ingredient } data-testid={ `${index}-ingredient-step` }>
              <label htmlFor={ ingredient }>
                <input id={ ingredient } type="checkbox" />
                {`${ingredient} ${measures[index]}`}
              </label>
            </li>
          ))}
      </ul>
      <p
        style={ { fontSize: '10px', width: '200px' } }
        data-testid="instructions"
      >
        {recipe.strInstructions}
      </p>
      <button type="button" data-testid="finish-recipe-btn">
        Finish Recipe
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idDaReceita: PropTypes.string,
    }),
    url: PropTypes.string,
  }),
}.isRequired;
