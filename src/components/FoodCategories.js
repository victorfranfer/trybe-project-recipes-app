import React, { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../context/RecipesContext';
import { fetchCategoryFoods, filterFoodByCategory } from '../services';

function FoodCategories() {
  const { apiCategoryFoods, setApiCategoryFoods,
    activeFoodCategory, setActiveFoodCategory } = useContext(RecipesContext);
  const [foodCategories, setFoodCategories] = useState();

  const filterCategory = ({ target }) => {
    setActiveFoodCategory(target.value);
    filterFoodByCategory(activeFoodCategory);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchCategoryFoods();
      setApiCategoryFoods(response);
    };
    fetchCategories();
  }, [setApiCategoryFoods]);

  useEffect(() => {
    const NUMBER_OF_CATEGORIES = 5;
    const categoriesSliced = apiCategoryFoods.slice(0, NUMBER_OF_CATEGORIES);
    setFoodCategories(
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
  }, [apiCategoryFoods]);

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
      {foodCategories}
    </section>
  );
}

export default FoodCategories;
