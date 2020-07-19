import { authenticateUser } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";

export const initAction = "[Autentication] Init";
export const loginAction = "[Authentication] Login";
export const logoutAction = "[Authentication] Logout";
export const loginSuccessAction = "[Authentication] Login - Success";
export const loginFailureAction = "[Authentication] Login - Failure";

const USER_KEY = "user";

export const init = () => ({
  type: initAction,
  payload: StorageService.get(USER_KEY),
});

export const login = (email, password) => (dispatch, getState) => {
  authenticateUser(email, password)
    .then((user) => dispatch(loginSuccess(user)))
    .catch((err) => dispatch(loginFailure(err.message)));
};

export const logout = () => {
  StorageService.delete(USER_KEY);
  return { type: logoutAction };
};

export const loginSuccess = (user) => {
  StorageService.set(USER_KEY, user);
  return {
    type: loginSuccessAction,
    payload: user,
  };
};

export const loginFailure = (error) => ({
  type: loginFailureAction,
  payload: error,
});
