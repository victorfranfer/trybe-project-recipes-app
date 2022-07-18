import React, { useContext } from 'react';
import { LoginContext } from '../context/Login/LoginContext';
import Footer from '../components/Footer';
import Header from '../components/header/Header';

function Foods() {

  const { apiFoods } = useContext(LoginContext);

  return (
    <div>
      <h1>Food</h1>
      <Header title="Foods" search />
      { apiFoods.length > 1? (
      apiFoods.map((food) => {
        <div data-testid={`${food.idMeal}-recipe-card`}>
          <h2
            data-testid={`${food.idMeal}-card-name`}
          >
            {`${food.strMeal}`}
          </h2>
          <img
            src={`${food.strMealThumb}`}
            alt={`${food.strMeal} image`}
            data-testid={`${food.idMeal}-card-img`}
          />
        </div>
        })) : ''
      };
      <Footer />
    </div>
  );
}

export default Foods;
