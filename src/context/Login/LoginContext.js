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

  const [checkLength, setCheckLength] = useState(false);

  const [apiDrinks, setApiDrinks] = useState([]);

  const [apiFoods, setApiFoods] = useState([]);

  const [validador, setValidador] = useState(false);

  const [typeFilter, setTypeFilter] = useState('');

  const [textInput, setTextInput] = useState('');

  const check = (api) => {
    if (api > 1) {
      setCheckLength(true);
    }
  };

  const getText = ({ target }) => {
    setTextInput(target.value);
    console.log(textInput);
  };

  const getType = ({ target }) => {
    setTypeFilter(target.id);
    console.log(typeFilter);
  };

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
        typeFilter,
        getType,
        getText,
        textInput,
        apiDrinks,
        apiFoods,
        setApiDrinks,
        setApiFoods,
        checkLength,
        check,
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
