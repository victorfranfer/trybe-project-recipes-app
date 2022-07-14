import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Validar se os elementos estão na tela', () => {
  test('Farewell, front-end', () => {
    renderWithRouter(<App/>);
    const input = screen.getByTestId("email-input");
    const password = screen.getByTestId("password-input");

    expect(input).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test('Se botao está desabilitado ao iniciar', () => {
    renderWithRouter(<App/>);
    const btnSubmit = screen.getByTestId('login-submit-btn');
    expect(btnSubmit).toBeDisabled();
  });

  test('Se botao está habilitado ao preencher os campos', () => {
    renderWithRouter(<App/>);
    const input = screen.getByTestId("email-input");
    const password = screen.getByTestId("password-input");
    const btnSubmit = screen.getByTestId('login-submit-btn');

    userEvent.type(input, 'lucasfpnt@gmail.com');
    userEvent.type(password, '1234567');

    expect(btnSubmit).not.toBeDisabled();
  });
});
