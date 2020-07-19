import React from "react";
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, screen } from "../test-utils";
import { NavBar } from "./NavBar";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  withTranslation: () => (Component) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: "",
    },
  }),
}));

describe("Navbar", () => {
  it("interacts with the store", () => {
    render(
      <Router history={createMemoryHistory()}>
        <NavBar />
      </Router>
    );

    // Par défaut on n'est pas loggé, on a un bouton de login
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });

  it("displays the username", async () => {
    const mockUser = {
      username: "test-username",
      email: "test-email",
    };

    // Render du composant avec un store déjà initialisé avec un utilisateur
    render(
      <Router history={createMemoryHistory()}>
        <NavBar />
      </Router>,
      {
        initialState: {
          authReducer: {
            loggedUser: mockUser,
            error: null,
            loading: false,
          },
        },
      }
    );

    // On vérifie que si on a un user dans le store, son nom est affiché
    expect(screen.getByTestId("login-hello")).toBeInTheDocument();
    expect(screen.getByTestId("login-hello")).toHaveTextContent(mockUser.username);
  });
});
