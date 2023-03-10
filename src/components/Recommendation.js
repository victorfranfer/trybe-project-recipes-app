import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { nameFood, nameDrink } from '../services/index';
import limitArrayLength from '../services/limitArray';
import './Recommendation.css';

const Recommendation = ({ pathName }) => {
  const [recomendations, setRecomendations] = useState([]);

  useEffect(() => {
    async function getRecommendations() {
      const maxRecomendations = 6;
      const data = pathName === 'foods' ? await nameFood() : await nameDrink();
      const dataKey = pathName === 'foods' ? 'meals' : 'drinks';
      setRecomendations(limitArrayLength(data[dataKey], maxRecomendations));
    }
    getRecommendations();
  }, [pathName]);

  const populateRecommendations = () => {
    const keys = pathName === 'foods'
      ? ['idMeal', 'strMealThumb', 'strMeal']
      : ['idDrink', 'strDrinkThumb', 'strDrink'];

    return (
      recomendations?.length > 0
      && recomendations.map((recommendation, index) => (
        <div
          key={ recommendation[keys[0]] }
          id={ recommendation[keys[0]] }
          className="recommendation-card"
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            src={ recommendation[keys[1]] }
            alt={ recommendation[keys[2]] }
          />
          <p data-testid={ `${index}-recomendation-title` }>
            {recommendation[keys[2]]}
          </p>
        </div>
      ))
    );
  };

  return (
    <section className="recommendation-carousel">
      {populateRecommendations()}
    </section>
  );
};

Recommendation.propTypes = {
  pathName: PropTypes.string.isRequired,
};

export default Recommendation;
