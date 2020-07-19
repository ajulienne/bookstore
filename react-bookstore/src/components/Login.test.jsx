import React from "react";
import { render } from "../test-utils";
import { Login } from "./Login";
import { screen, wait } from "@testing-library/react";

// Mock du useHistory
const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: jest.fn(() => ({})),
}));

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

describe("Login", () => {
  it("doesn't display the error message", () => {
    render(<Login />);

    expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
  });

  it("display the error message", () => {
    const errorMessage = "Test message";

    // Render du composant avec un store déjà initialisé avec une erreur
    render(<Login />, {
      initialState: {
        authReducer: {
          loggedUser: null,
          error: errorMessage,
          loading: false,
        },
      },
    });

    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(screen.getByTestId("error-message")).toHaveTextContent(errorMessage);
  });

  it("redirects to the home page when logged in", async () => {
    // Render du composant avec un store déjà initialisé avec un utilisateur
    render(<Login />, {
      initialState: {
        authReducer: {
          loggedUser: {
            username: "test-username",
            email: "test-email",
          },
          error: null,
          loading: false,
        },
      },
    });

    // On vérifie qu'une fois qu'on à un user dans le store, on est redirigé vers le home (dans le useEffect)
    // Pour fonctionner, il faut déclarer une fonction mock dans le jest.mock, et on test sur cette fonction
    await wait(() => expect(mockHistoryPush).toHaveBeenCalledWith("/"));
  });
});
