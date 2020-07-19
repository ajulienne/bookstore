import { loginAction, logoutAction, loginSuccessAction, loginFailureAction, initAction } from "../actions";

export const authInitialState = {
  loggedUser: null,
  loading: false,
  error: null,
};

export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case initAction:
      return {
        ...state,
        loggedUser: action.payload,
      };
    case loginAction:
      return {
        ...state,
        loading: true,
      };
    case logoutAction:
      return authInitialState;
    case loginSuccessAction:
      return {
        ...state,
        loggedUser: action.payload,
        loading: false,
      };
    case loginFailureAction:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
