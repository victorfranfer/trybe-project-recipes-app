import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { RecipesContext } from '../context/RecipesContext';

function Drinks() {
  const { apiDrinks } = useContext(RecipesContext);
  const [drinks, setDrinks] = useState();
  const navigate = useHistory();

  useEffect(() => {
    const NUMBER_OF_DRINKS = 12;
    if (apiDrinks.length > 1) {
      const drinksSliced = apiDrinks.slice(0, NUMBER_OF_DRINKS);
      setDrinks(
        drinksSliced.map((obj, index) => (
          <Link to={ `/drinks/${obj.idDrink}` } key={ index }>
            <section
              key={ `${index}` }
              data-testid={ `${index}-recipe-card` }
              className="card"
            >
              <h2 data-testid={ `${index}-card-name` }>{`${obj.strDrink}`}</h2>
              <img
                className="imgCard"
                src={ `${obj.strDrinkThumb}` }
                alt={ `${obj.strDrink}` }
                data-testid={ `${index}-card-img` }
              />
            </section>
          </Link>
        )),
      );
    } else if (apiDrinks.length === 1) {
      navigate.push(`/drinks/${apiDrinks[0].idDrink}`);
    }
  }, [apiDrinks, navigate]);

  return (
    <div>
      <Header title="Drinks" search />
      {drinks}
      <Footer />
    </div>
  );
}

export default Drinks;
