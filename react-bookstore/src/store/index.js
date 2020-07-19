import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./reducers";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({ authReducer });

/**
 * Configure le store et ses middlewares
 * @param {*} initialState Etat initial du store
 */
export const configureStore = (initialState) => {
  const middlewares = [thunk];

  if (process.env.REACT_APP_LOG_REDUX === "true") {
    middlewares.push(createLogger({ collapsed: true, level: "warn" }));
  }

  let reduxMiddlewares = applyMiddleware(...middlewares);

  if (process.env.NODE_ENV !== "production") {
    reduxMiddlewares = composeWithDevTools(reduxMiddlewares);
  }

  return createStore(rootReducer, initialState, reduxMiddlewares);
};
