import React, { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../context/RecipesContext';
import { fetchCategoryDrinks } from '../services';

function DrinkCategories() {
  const { apiCategoryDrinks, setApiCategoryDrinks } = useContext(RecipesContext);
  const [drinkCategories, setDrinkCategories] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchCategoryDrinks();
      setApiCategoryDrinks(response);
    };
    fetchCategories();
  }, [setApiCategoryDrinks]);

  useEffect(() => {
    const NUMBER_OF_CATEGORIES = 5;
    const categoriesSliced = apiCategoryDrinks.slice(0, NUMBER_OF_CATEGORIES);
    setDrinkCategories(
      categoriesSliced.map((obj, index) => (
        <button
          type="button"
          data-testid={ `${obj.strCategory}-category-filter` }
          key={ index }
        >
          { obj.strCategory }
        </button>
      )),
    );
  }, [apiCategoryDrinks]);

  return (
    <section className="Category-buttons">
      {drinkCategories}
    </section>
  );
}

export default DrinkCategories;
