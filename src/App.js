import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import { LoginProvider } from './context/Login/LoginContext';

function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <Switch>
          <LoginProvider>
            <Route exact path="/" component={ Login } />
            <Route exact path="/foods" component={ Foods } />
            <Route exact path="/drinks" component={ Drinks } />
            <Route exact path="/profile" component={ Profile } />
          </LoginProvider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
