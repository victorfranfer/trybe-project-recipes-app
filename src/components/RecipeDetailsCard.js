import React from 'react';
import PropTypes from 'prop-types';
import getIngredientsAndMeasures from '../services/getIngredients';

const RecipeDetailsCard = ({ recipe, url }) => {
  const { ingredients, measures } = getIngredientsAndMeasures(recipe);

  return (
    <div
      className="recipe"
      style={ {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        padding: '20px',
        textAlign: 'center',
      } }
    >
      <img
        style={ { width: '40px' } }
        src={ recipe?.strDrinkThumb || recipe.strMealThumb }
        alt={ recipe?.strDrink || recipe?.strMeal }
        data-testid="recipe-photo"
      />
      <h1 style={ { fontSize: '24px' } } data-testid="recipe-title">
        {recipe?.strDrink || recipe?.strMeal}
      </h1>
      <p
        style={ { fontSize: '24px', padding: '20px' } }
        data-testid="recipe-category"
      >
        {recipe?.strAlcoholic || recipe?.strCategory}
      </p>
      <ul style={ { fontSize: '18px' } }>
        {ingredients.map((ingredient, i) => (
          <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
            <span data-testid={ `${i}-ingredient-name-and-measure` }>
              {ingredient}
            </span>
            {' '}
            <span data-testid={ `${i}-ingredient-name-and-measure` }>
              {measures[i] !== null ? measures[i] : ''}
            </span>
          </li>
        ))}
      </ul>
      <p
        style={ {
          fontSize: '10px',
          textAlign: 'center',
          display: 'inline-block',
        } }
        data-testid="instructions"
      >
        {recipe.strInstructions}
      </p>
      {url.includes('foods') && (
        <iframe
          style={ { width: '180px', height: '90px' } }
          src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          data-testid="video"
        />
      )}
    </div>
  );
};

RecipeDetailsCard.propTypes = {
  recipe: PropTypes.instanceOf(Object),
  url: PropTypes.string,
}.isRequired;

export default RecipeDetailsCard;
