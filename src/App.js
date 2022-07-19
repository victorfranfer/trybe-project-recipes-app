import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes/Routes';
import { RecipesProvider } from './context/RecipesContext';

function App() {
  return (
    <div className="meals">
      <RecipesProvider>
        <Routes />
      </RecipesProvider>
    </div>
  );
}

export default App;
