import React, { useState } from 'react';
import propTypes from 'prop-types';
import isValidEmail from '../../utils/validation';

const LoginContext = React.createContext();
LoginContext.displayName = 'LoginContext';

const LoginProvider = ({ children }) => {
  const [dados, setDados] = useState({
    email: '',
    password: '',
  });

  const [validador, setValidador] = useState(false);

  const validadorDados = (infos) => {
    const PASSWORD_LEGTH = 6;
    if (isValidEmail(infos.email) && infos.password.length >= PASSWORD_LEGTH) {
      setValidador(true);
    } else {
      setValidador(false);
    }
  };

  const salvaDadosNoLocalStore = () => {
    localStorage.setItem('user', JSON.stringify({ email: dados.email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };
  return (
    <LoginContext.Provider
      value={ {
        dados,
        setDados,
        validador,
        validadorDados,
        salvaDadosNoLocalStore,
      } }
    >
      {children}
    </LoginContext.Provider>
  );
};

LoginProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export { LoginContext, LoginProvider };
