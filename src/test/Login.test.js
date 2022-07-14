import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Validar se os elementos estão na tela', () => {
  test('Farewell, front-end', () => {
    render(<App />);
    const input = screen.getByText(/email/i);
    const password = screen.getByText(/senha/i);

    expect(input).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test('Se botao está desabilitado ao iniciar', () => {
    render(<App />);
    const button = screen.getByText(/enter/i);
    expect(button).toBeDisabled();
  });

  test('Se botao está habilitado ao preencher os campos', () => {
    render(<App />);
    const input = screen.getByText(/email/i);
    const password = screen.getByText(/senha/i);
    const button = screen.getByText(/enter/i);

    userEvent.type(input, 'lucasfpnt@gmail.com');
    userEvent.type(password, '1234567');

    expect(button).not.toBeDisabled();
  });
});
