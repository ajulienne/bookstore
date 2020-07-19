import { logout, logoutAction, loginSuccess, loginSuccessAction, loginFailure, loginFailureAction } from "./auth.actions";

describe("Auth actions", () => {
  it("create the login success action", () => {
    const user = {
      username: "testUsername",
      password: "testPassword",
      email: "testEmail",
    };

    const action = loginSuccess(user);

    expect(action.type).toBe(loginSuccessAction);
    expect(action.payload).toBe(user);
  });

  it("create the login failure action", () => {
    const err = "Test error message";

    const action = loginFailure(err);

    expect(action.type).toBe(loginFailureAction);
    expect(action.payload).toBe(err);
  });

  it("Create the logout action", () => {
    expect(logout().type).toBe(logoutAction);
  });
});
