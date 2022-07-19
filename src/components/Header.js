import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import { RecipesContext } from '../context/RecipesContext';

function Header({ title, search }) {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const handleInput = () => {
    setButtonDisabled(!buttonDisabled);
  };

  const { getText } = useContext(RecipesContext);

  return (
    <header>
      <Link to="/profile">
        <button type="button">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="profile"
          />
        </button>
      </Link>

      {search && (
        <button
          type="button"
          onClick={ handleInput }
        >
          <img
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="search"
          />
        </button>)}

      {!buttonDisabled && (
        <div>
          <input
            data-testid="search-input"
            type="text"
            placeholder="Search"
            onChange={ getText }
          />
          <SearchBar />
        </div>
      )}
      <h1 data-testid="page-title">{title}</h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.bool,
}.isRequired;

export default Header;
