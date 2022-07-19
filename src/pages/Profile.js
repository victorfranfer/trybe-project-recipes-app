import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();

  const handleClick = (page) => history.push(page);

  const getStorageData = (keyName, defaultValue = '') => {
    const savedItem = localStorage.getItem(keyName);
    const parsedItem = JSON.parse(savedItem);
    return parsedItem || defaultValue;
  };

  return (
    <div>
      <Header title="Profile" />
      <div>
        <p data-testid="profile-email">
          { getStorageData('user').email }
        </p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => handleClick('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => handleClick('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ async () => {
            await localStorage.clear();
            handleClick('/');
          } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
