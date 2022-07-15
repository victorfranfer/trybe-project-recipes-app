import React from 'react';
// import { useHistory } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <a href="/drinks">
        <img
          src="../images/drinkIcon.svg"
          alt="Ícone de bedidas"
          data-testid="drink-bottom-btn"
        />
      </a>
      <a href="/foods">
        <img
          src="../images/mealIcon.svg"
          alt="Ícone de comida"
          data-testid="food-bottom-btn"
        />
      </a>
    </footer>
  );
}

export default Footer;
