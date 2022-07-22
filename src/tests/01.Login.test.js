import React from "react";
import { screen } from "@testing-library/react";
import { cleanup, waitFor } from "@testing-library/react";
import { useHistory } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import { RuleTester } from "eslint";

describe("Validar se os elementos estão na tela", () => {
  beforeEach(cleanup);
  test("Farewell, front-end", () => {
    renderWithRouterProvider(<App />);
    const input = screen.getByTestId("email-input");
    const password = screen.getByTestId("password-input");

    expect(input).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test("Se botao está desabilitado ao iniciar", () => {
    renderWithRouterProvider(<App />);
    const btnSubmit = screen.getByTestId("login-submit-btn");
    expect(btnSubmit).toBeDisabled();
  });

  test("Se botao está habilitado ao preencher os campos", () => {
    renderWithRouterProvider(<App />);
    const input = screen.getByTestId("email-input");
    const password = screen.getByTestId("password-input");
    const btnSubmit = screen.getByTestId("login-submit-btn");

    userEvent.type(input, "lucasfpnt@gmail.com");
    userEvent.type(password, "1234567");

    expect(btnSubmit).not.toBeDisabled();
  });

  test("Testa se ao submeter o formulario, o usuario é redirecionado para a pagina de foods", async () => {
    // const { history } = useHistory();
    const { history } = renderWithRouterProvider(<App />);
    const input = screen.getByTestId("email-input");
    const password = screen.getByTestId("password-input");
    const btnSubmit = screen.getByTestId("login-submit-btn");

    userEvent.type(input, "lucas@gmail.com");
    userEvent.type(password, "1234567");

    expect(btnSubmit.disabled).toBeFalsy();


    userEvent.click(btnSubmit)
    expect(screen.getByRole('heading', {  name: /foods/i})).toBeInTheDocument()

    await waitFor(() => {
      userEvent.click(btnSubmit);
      expect(history.location.pathname).toBe("/foods");
    });
  });

  test("verifica se o token está salvo no local storage", async () => {
    const { history } = renderWithRouterProvider(<App />);
    const input = screen.getByTestId("email-input");
    const password = screen.getByTestId("password-input");
    const btnSubmit = screen.getByTestId("login-submit-btn");

    userEvent.type(input, "lucas@gmail.com");
    userEvent.type(password, "1234567");
    userEvent.click(btnSubmit);

    await waitFor(() => {
      expect(localStorage.getItem("user")).toBeTruthy();
    });
  });

  test("Verifica se o navigate.push('/foods'); funciona", () => {
    const { history } = renderWithRouterProvider(<App />);
    const input = screen.getByTestId("email-input");
    const password = screen.getByTestId("password-input");
    const btnSubmit = screen.getByTestId("login-submit-btn");

    userEvent.type(input, "lucas@gmail.com");
    userEvent.type(password, "1234567");
    userEvent.click(btnSubmit);

    expect(history.location.pathname).toBe("/foods");
  })
});
