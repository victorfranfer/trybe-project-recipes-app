import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { LoginProvider } from '../context/Login/LoginContext';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<LoginProvider><Router history={ history }>{component}</Router></LoginProvider>), history,
  });
};
export default renderWithRouter;