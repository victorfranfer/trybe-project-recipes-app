import React from 'react';
import { useHistory } from 'react-router-dom';
import { fetchDrinkById, fetchFoodById } from '../services/index';

function RecipeDetails() {
  const history = useHistory();

  async function getId() {
    const { pathname } = history.location;
    const id = pathname.split('/');
    const apiFood = await fetchFoodById(id[2]);
    const apiDrink = await fetchDrinkById(id[2]);

    if (id[1] === 'foods') {
      return apiFood;
    } if (id[1] === 'drinks') {
      return apiDrink;
    }
  }

  return (
    <button type="button" onClick={ () => console.log(getId()) }>
      Go home
    </button>
  );
}

export default RecipeDetails;
