import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../context/Login/LoginContext';

const Login = () => {
  const {
    dados,
    setDados,
    validadorDados,
    validador,
    salvaDadosNoLocalStore } = useContext(LoginContext);

  const navigate = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
    validadorDados(dados);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    salvaDadosNoLocalStore();
    navigate.push('/foods');
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
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
