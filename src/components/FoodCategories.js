import React, { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../context/RecipesContext';
import { fetchCategoryFoods } from '../services';

function FoodCategories() {
  const { apiCategoryFoods, setApiCategoryFoods } = useContext(RecipesContext);
  const [foodCategories, setFoodCategories] = useState();

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
        >
          { obj.strCategory }
        </button>
      )),
    );
  }, [apiCategoryFoods]);

  return (
    <section className="Category-buttons">
      {foodCategories}
    </section>
  );
}

export default FoodCategories;
