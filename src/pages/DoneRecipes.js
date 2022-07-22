import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const history = useHistory();

  const result = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  const [mealsMade, setMealsMade] = useState(result);

  const shareUrl = (value) => {
    const url = `http://localhost:3000/foods/${result[value].id}`;
    navigator.clipboard.writeText(url);
    const snackbar = document.getElementsByClassName('snackbar')[value];
    snackbar.style.display = 'block';
  };

  const filtros = (value) => {
    let data = result;
    if (value === 'all') {
      data = result;
    }
    if (value === 'food') {
      data = result.filter((meal) => meal.type === 'food');
    }
    if (value === 'drink') {
      data = result.filter((meal) => meal.type === 'drink');
    }
    setMealsMade(data);
  };

  useEffect(() => {
  }, [mealsMade]);

  return (
    <section>
      <Header title="Done Recipes" />
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
        { mealsMade.length > 0 && mealsMade.map((recipe, index) => (

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

              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}
              </p>

              { recipe && recipe.tags.map((tag, i) => (
                i < 2 && (
                  <p
                    key={ tag }
                    data-testid={ `${0}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                )

              ))}
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

              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}
              </p>

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

export default DoneRecipes;
