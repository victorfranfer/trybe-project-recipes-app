import React from 'react';
import { screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouterProvider from './helper/renderWithRouterProvider';
import mockFetch from './mocks/mockFetch';
import { dataResponseCategories, dataResponseDrinks, dataResponseMeals } from './mocks/dataResponseApi';
import App from '../App';

global.alert = jest.fn();
afterEach(cleanup)

describe('verifica o componente Search.js', () => {
  it('1 - Search bar de drinks redireciona quando tem 1 elemento na lista:', async () => {
    mockFetch(dataResponseDrinks)
    const { history } = renderWithRouterProvider(<App />);
    history.push('/drinks');

    const searchIconElem = await screen.findByTestId('search-top-btn');
    userEvent.click(searchIconElem);
    const searchBarElem = await screen.findByTestId('search-input');
    const searchBtnElem = await screen.findByTestId('exec-search-btn')
    const radioNameElem = await screen.findByTestId('name-search-radio');
    
    expect(searchBarElem).toBeInTheDocument();
    expect(searchBtnElem).toBeInTheDocument();
    expect(radioNameElem).toBeInTheDocument();

    userEvent.click(radioNameElem);
    userEvent.type(searchBarElem, 'florida');
    userEvent.click(searchBtnElem);

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/14588'), { timeout: 4000});
  });
  // test('Verifica se a página contem 12 itens renderizados', async () => {
  //   renderWithRouterProvider(<Foods />)

  //   const searchTopBtn = screen.getByTestId('search-top-btn');
  //   userEvent.click(searchTopBtn);
  //   const radioName = screen.getByTestId('name-search-radio');
  //   userEvent.click(radioName);
  //   const input = screen.getByTestId('search-input');
  //   userEvent.type(input, 'chicken');
  //   const execSearchBtn = screen.getByTestId('exec-search-btn');
  //   userEvent.click(execSearchBtn);


    
  //   expect(await screen.findAllByRole('a')).toHaveLength(12)
  // })
//   test('verifica os elementos do componente', () => {
//     renderWithRouterProvider(<Drinks />);

//     const button = screen.getByTestId('search-top-btn');
//     expect(button).toBeInTheDocument();
    
//     userEvent.click(button);

//     const radio1 = screen.getByTextId('ingredient-search-radio');
//     const radio2 = screen.getByTextId('name-search-radio');
//     const radio3 = screen.getByTextId('first-letter-search-radio');
//     const buttonSearch = screen.getByTextId('exec-search-btn');

//     expect(radio1).toBeInTheDocument();
//     expect(radio2).toBeInTheDocument();
//     expect(radio3).toBeInTheDocument();
//     expect(buttonSearch).toBeInTheDocument();
//   });
//   test('verifica se ao fizer busca renderiza resultados', () => {
//     renderWithRouterProvider(<Drinks />);

//     const searchBtn = screen.getByTestId('search-top-btn');
    

//     userEvent.click(searchBtn);
//     const input = screen.getByTestId('search-input');

//     expect(input).toBeInTheDocument();
//     const nameRadio = screen.getByLabelText(/name/i);
//     userEvent.click(nameRadio);
//     userEvent.type(input, 'margarita');
//     const buttonSearch = screen.getByTestId('exec-search-btn');
//     userEvent.click(buttonSearch);
//     jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
//       status: 200,
//       ok: true,
//       json: () => Promise.resolve(responseDrinks)
//     }));

//     expect(global.fetch).toHaveBeenCalled();
//     expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
//   });

//   test('Verifica se ao pesquisar pelo nome Xablau um alerta é emitido',async  () =>{
//     renderWithRouterProvider(<Drinks />)
    
//     const searchBtn = screen.getByTestId('search-top-btn');
//     userEvent.click(searchBtn);

//     const filterSearchBtn = screen.getByTestId('exec-search-btn');    
//     const searchInput = screen.getByTestId('search-input');
//     const nameRadio = screen.getByLabelText(/name/i);

//     userEvent.click(nameRadio);
//     userEvent.type(searchInput,'xablau');
//     userEvent.click(filterSearchBtn);

//     await waitFor(() => {
//        expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.')
//     })
//   })
//   test('Verifica se ao pesquisar pelo nome Chicken Handi é direcionado para a pagina de detalhe', async ()=> {
//     const{history} = renderWithRouterProvider(<Drinks />)

//     const searchBtn = screen.getByTestId('search-top-btn');
//     userEvent.click(searchBtn);

//     const filterSearchBtn = screen.getByTestId('exec-search-btn');    
//     const searchInput = screen.getByTestId('search-input');
//     const nameRadio = screen.getByLabelText(/name/i);

//     userEvent.click(nameRadio);
//     userEvent.type(searchInput,'chicken handi');
//     userEvent.click(filterSearchBtn);

//     expect(await screen.findByText('Chicken Handi')).toBeInTheDocument()
//     await waitFor(()=>{
//       expect(history.location.pathname).toBe('/foods/52795')
//     })
//     expect(screen.getByText(/Food detail page/i)).toBeInTheDocument()
//   })
  // test('Testando se ao inserir mais de uma letra um alerta é emitido', async () => {
  //   const { history } = renderWithRouterProvider(<Drinks />)

  //   const searchBtn = screen.getByTestId('search-top-btn');
  //   userEvent.click(searchBtn);

  //   const firstLetterRadio = screen.getByLabelText(/first letter/i);
  //   const searchInput = screen.getByTestId('search-input');

  //   userEvent.click(firstLetterRadio);
  //   userEvent.type(searchInput,'aa');

  //   await waitFor(()=>{
  //     expect(global.alert).toBeCalled()
  //   })

  // })
})
