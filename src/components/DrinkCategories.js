import React, { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../context/RecipesContext';
import {
  fetchCategoryDrinks,
  filterDrinkByCategory,
} from '../services';

function DrinkCategories() {
  const { apiCategoryDrinks, setApiCategoryDrinks,
    activeDrinksCategory, setActiveDrinksCategory } = useContext(RecipesContext);
  const [drinkCategories, setDrinkCategories] = useState();

  const filterCategory = ({ target }) => {
    setActiveDrinksCategory(target.value);
    filterDrinkByCategory(activeDrinksCategory);
  };

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
          className="category-btn"
          onClick={ filterCategory }
          value={ obj.strCategory }
        >
          { obj.strCategory }
        </button>
      )),
    );
  }, [apiCategoryDrinks]);

  return (
    <section className="Category-buttons">
      <button
        type="button"
        data-testid="All-category-filter"
        value="All"
        onClick={ filterCategory }
      >
        All
      </button>
      {drinkCategories}
    </section>
  );
}

export default DrinkCategories;
