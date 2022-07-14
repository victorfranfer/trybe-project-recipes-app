import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import { LoginProvider } from './context/Login/LoginContext';

function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <Switch>
          <LoginProvider>
            <Route exact path="/" component={ Login } />
          </LoginProvider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
