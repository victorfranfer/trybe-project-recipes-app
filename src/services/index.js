const ingredientDrink = (ingredient) => {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json())
    .catch(() => console.log('error'));
};

const nameDrink = (name) => {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json())
    .catch(() => console.log('error'));
};

const firstLetterDrink = (firstLatter) => {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLatter}`)
    .then((response) => response.json())
    .catch(() => console.log('error'));
};

export const filterDrink = (typeFilter, text) => {
  switch (typeFilter) {
  case 'ingredient':
    return ingredientDrink(text);
  case 'name':
    return nameDrink(text);
  case 'firstLatter':
    return firstLetterDrink(text);
  default:
    return 'error';
  };
};