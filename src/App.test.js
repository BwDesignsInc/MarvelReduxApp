import React from 'react';
import App from './App';
import { createStore } from 'redux'
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import reducer from './rootReducer.js'

function renderWithRedux(
  ui,
  { initialState = {}, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}><Router>{ui}</Router></Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}

test('renders learn react link', () => {
  const { getByTestId } = renderWithRedux(<App />);
  const linkElement = getByTestId(/marvelApp/i);
  expect(linkElement).toBeInTheDocument();
});
