import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Recommendation from '../components/Recommendation';
import { requestDetails } from '../services/index';
import {
  getRecipeFromLocalStorage,
  setRecipeInLocalStorage,
} from '../services/localStorage';
import RecipeDetailsCard from '../components/RecipeDetailsCard';
import ShareAndFavoriteButton from '../components/ShareAndFavoriteButton';
import './RecipeDetails.css';

function RecipeDetails({
  match: {
    params: { idDaReceita },
    url,
  },
}) {
  const history = useHistory();
  const [recipe, setRecipe] = useState('');
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState({
    meals: {},
    cocktails: {},
  });
  const [recipeStatus, setRecipeStatus] = useState('');
  const [key, setKey] = useState('');

  useEffect(() => {
    const getRecipe = async () => {
      const recipeDetails = url.includes('foods')
        ? await requestDetails.food(idDaReceita)
        : await requestDetails.drink(idDaReceita);

      if (url.includes('foods')) {
        setKey('meals');
        setRecipe(recipeDetails.meals[0]);
      } else {
        setKey('cocktails');
        setRecipe(recipeDetails.drinks[0]);
      }
    };
    getRecipe();
  }, [idDaReceita, url, key]);

  useEffect(() => {
    const getRecipesInProgress = getRecipeFromLocalStorage('inProgressRecipes');
    if (
      Object.keys(getRecipesInProgress).length > 0
      || getRecipesInProgress.length > 0
    ) {
      setInProgressRecipes(getRecipesInProgress);
      if (
        key
        && Object.keys(getRecipesInProgress[key]).some((id) => id === idDaReceita)
      ) {
        setRecipeStatus('inProgress');
      }
    }
  }, [key, idDaReceita]);

  useEffect(() => {
    setDoneRecipes(getRecipeFromLocalStorage('doneRecipes'));
  }, []);

  const isThisRecipeDone = () => doneRecipes?.some((d) => d.id === idDaReceita);
  const handleClick = () => {
    if (!recipeStatus) {
      const localStorageStructure = {
        ...inProgressRecipes,
        [key]: {
          [idDaReceita]: [],
          ...inProgressRecipes[key],
        },
      };
      setRecipeInLocalStorage('inProgressRecipes', localStorageStructure);
    }
    history.push(`${idDaReceita}/in-progress`);
  };

  return (
    <section>
      {recipe && <RecipeDetailsCard recipe={ recipe } url={ url } />}
      <ShareAndFavoriteButton recipe={ recipe } idDaReceita={ idDaReceita } />
      {url.includes('foods') ? (
        <Recommendation pathName="drinks" />
      ) : (
        <Recommendation pathName="foods" />
      )}

      {isThisRecipeDone() === false && (
        <button
          data-testid="start-recipe-btn"
          className="button-start"
          type="button"
          onClick={ handleClick }
        >
          {recipeStatus === 'inProgress' ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </section>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idDaReceita: PropTypes.string,
    }),
    url: PropTypes.string,
  }),
}.isRequired;

export default RecipeDetails;
