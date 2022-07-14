import React, { useContext } from 'react';
import { LoginContext } from '../context/Login/LoginContext';

const Login = () => {
  const { dados, setDados, validadorDados, validador } = useContext(LoginContext);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
    validadorDados(dados);
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            data-testid="email-input"
            name="email"
            value={ dados.email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            type="text"
            id="senha"
            name="password"
            data-testid="password-input"
            value={ dados.password }
            onChange={ handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !validador }
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default Login;
