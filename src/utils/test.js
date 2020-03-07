import React from "react";
import thunk from "redux-thunk";
import { createMemoryHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import reducer from "rootReducer.js";

export function renderWithRedux(
  ui,
  {
    initialState = {},
    store = createStore(reducer, initialState, applyMiddleware(thunk)),
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <Router>{ui}</Router>
      </Provider>
    ),
    store,
    history
  };
}
export default renderWithRedux;
