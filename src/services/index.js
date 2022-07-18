const ingredientDrink = (ingredient) => {
  const api = fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json())
    .catch(() => console.log('error'));

  return api;
};

const nameDrink = (name) => {
  const api = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json())
    .catch(() => console.log('error'));
  
  return api;
};

const firstLetterDrink = (firstLatter) => {
  const api = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLatter}`)
    .then((response) => response.json())
    .catch(() => global.alert('Your search must have only 1 (one) character'));
    
    return api;
};

export const filterDrink = (typeFilter, text) => {
  switch (typeFilter) {
  case 'ingredient':
    return ingredientDrink(text);
  case 'name':
    return nameDrink(text);
  case 'first-letter':
    return firstLetterDrink(text);
  default:
    return 'error';
  };
};

const ingredientFood = (ingredient) => {
  const api = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json())
    .catch(() => console.log('error'));

  return api;
};

const nameFood = (name) => {
  const api = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json())
    .catch(() => console.log('error'));
  
  return api;
};

const firstLetterFood = (firstLatter) => {
  const api = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLatter}`)
    .then((response) => response.json())
    .catch(() => global.alert('Your search must have only 1 (one) character'));
  
  return api;
};

export const filterFood = (typeFilter, text) => {
  switch (typeFilter) {
  case 'ingredient':
    return ingredientFood(text);
  case 'name':
    return nameFood(text);
  case 'first-letter':
    return firstLetterFood(text);
  default:
    return 'error';
  };
};
