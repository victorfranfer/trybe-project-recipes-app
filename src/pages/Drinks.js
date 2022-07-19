import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import { LoginContext } from '../context/Login/LoginContext';

function Drinks() {
  const { apiDrinks } = useContext(LoginContext);

  return (
    <div>
      <Header title="Drinks" search />
      {apiDrinks.length > 1 && apiDrinks.map((obj, index) => (
        <section
          key={ `${index}` }
          data-testid={ `${index}-recipe-card` }
          className="card"
        >
          <h2 data-testid={ `${index}-card-name` }>
            {`${obj.strDrink}`}
          </h2>
          <img
            className="imgCard"
            src={ `${obj.strDrinkThumb}` }
            alt={ `${obj.strDrink}` }
            data-testid={ `${index}-card-img` }
          />
        </section>
      )) }
      <Footer />
    </div>
  );
}

export default Drinks;
