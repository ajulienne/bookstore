// test-utils.js
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { authInitialState, authReducer } from "./store/reducers";

const gloablInitialState = {
  authReducer: authInitialState,
};

function render(ui, { initialState = gloablInitialState, store = createStore(combineReducers({ authReducer }), initialState), ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
