import React from "react";

const Login = () => {
  return (
    <div>
      <form>
        <label>
          Email
          <input type="email" data-testid="email-input" />
        </label>
        <label>
          Senha
          <input type="text" data-testid="password-input" />
        </label>
        <button type="submit" data-testid="login-submit-btn">
          Enter
        </button>
      </form>
    </div>
  );
};

export default Login;
