import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import { LoginContext } from '../context/Login/LoginContext';
import './Foods.css';

function Foods() {
  const { apiFoods } = useContext(LoginContext);

  return (
    <div>
      <h1>Food</h1>
      <Header title="Foods" search />
      {apiFoods.length > 1 && apiFoods.map((obj, index) => (
        <section
          key={ `${index}` }
          data-testid={ `${index}-recipe-card` }
          className="card"
        >
          <h2 data-testid={ `${index}-card-name` }>
            {`${obj.strMeal}`}
          </h2>
          <img
            className="imgCard"
            src={ `${obj.strMealThumb}` }
            alt={ `${obj.strMeal}` }
            data-testid={ `${index}-card-img` }
          />
        </section>
      )) }
      <Footer />
    </div>
  );
}

export default Foods;
