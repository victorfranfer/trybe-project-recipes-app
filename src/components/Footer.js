import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <a href="/drinks">
        <img
          src={ drinkIcon }
          alt="Ícone de bedidas"
          data-testid="drinks-bottom-btn"
        />
      </a>
      <a href="/foods">
        <img
          src={ mealIcon }
          alt="Ícone de comida"
          data-testid="food-bottom-btn"
        />
      </a>
    </footer>
  );
}

export default Footer;
