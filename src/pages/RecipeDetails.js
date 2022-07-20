import React, { useState } from 'react';
import { fetchDrinkById, fetchFoodById } from '../services/index';

import { useHistory } from 'react-router-dom';

function RecipeDetails() {
  const history = useHistory();
  const [food, setFood] = useState({});

  async function getId() {
    const pathname = history.location.pathname;
    const id = pathname.split('/');
    const apiFood = await fetchFoodById(id[2]);
    const apiDrink = await fetchDrinkById(id[2]);

    if (id[1] === 'foods') {
      setFood(apiFood);
    } if (id[1] === 'drinks') {
      setFood(apiDrink);
    }
    
    // switch (id[1]) {
    //   case 'foods':
    //     setFood({...apiFood});
    //     break;
    //   case 'drinks':
    //     setFood(apiDrink);
    //     break;
    // };
  };

  getId();

  return (
    <button type="button" onClick={ () => console.log(food) }>
      Go home
    </button>
  );
}

export default RecipeDetails;
