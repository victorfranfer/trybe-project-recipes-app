import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <div>
      <input
        type='text'
      />
      <label htmlFor='ingredient'>
        <input
          type='radio'
          data-testid="ingredient-search-radio"
          id='ingrediente'
          name='search-radio'
        />
        Ingredient
      </label>
      <label htmlFor='name'>
        <input
          type='radio'
          data-testid="name-search-radio"
          id='name'
          name='search-radio'
        />
        Name
      </label>
      <label htmlFor='first-letter'>
        <input
          type='radio'
          data-testid="first-letter-search-radio"
          id='first-letter'
          name='search-radio'
        />
        First Letter
      </label>
      <button
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
