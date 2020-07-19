import { authReducer } from "./auth.reducer";
import { login, logout, loginSuccess, loginFailure } from "../actions";

describe("Auth reducer", () => {
  it("sets the logged user when success", () => {
    const user = {
      username: "testUser",
    };

    const user2 = {
      username: "testUser2",
    };

    // login sur un state vide
    const newState = authReducer({}, loginSuccess(user));
    expect(newState.loggedUser).toBe(user);

    // login sur un state qui contient déjà un user
    const newState2 = authReducer(newState, loginSuccess(user2));
    expect(newState2.loggedUser).toBe(user2);
  });

  it("set the error when failure", () => {
    const error = "Test error message";

    expect(authReducer({}, loginFailure(error)).error).toBe(error);
  });

  it("returns the current state on unknown action", () => {
    const currentState = { loggedUser: { username: "test" } };
    expect(authReducer(currentState, "unknown-action")).toBe(currentState);
  });

  it("log out the user", () => {
    const currentStateWithUser = {
      loggedUser: {
        username: "testUser",
      },
    };

    const newState = authReducer(currentStateWithUser, logout());
    expect(newState.loggedUser).toBe(null);
  });
});
