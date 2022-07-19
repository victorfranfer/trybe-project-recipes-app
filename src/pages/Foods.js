import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { RecipesContext } from '../context/RecipesContext';
import './Foods.css';

function Foods() {
  const { apiFoods } = useContext(RecipesContext);
  const [foods, setFoods] = useState();
  const navigate = useHistory();

  useEffect(() => {
    if (apiFoods.length > 1) {
      setFoods(apiFoods.map((obj, index) => (
        <Link to={ `/foods/${obj.idMeal}` } key={ index }>
          <section
            style={ {
              display: 'flex',
            } }
            data-testid={ `${index}-recipe-card` }
            className="card"
          >
            <h2 data-testid={ `${index}-card-name` }>{`${obj.strMeal}`}</h2>
            <img
              className="imgCard"
              src={ `${obj.strMealThumb}` }
              alt={ `${obj.strMeal}` }
              data-testid={ `${index}-card-img` }
            />
          </section>
        </Link>)));
    } else if (apiFoods.length === 1) {
      navigate.push(`/foods/${apiFoods[0].idMeal}`);
    } else {
      return <h1>No results</h1>;
    }
  }, [apiFoods, navigate]);

  return (
    <div>
      <h1>Food</h1>
      <Header title="Foods" search />
      {foods}
      <Footer />
    </div>
  );
}

export default Foods;
