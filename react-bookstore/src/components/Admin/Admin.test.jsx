import React from "react";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";
import { Admin } from "./Admin";

jest.mock("./AddBook.jsx", () => ({
  AddBook: jest.fn(() => <div data-testid="test-add-book"></div>),
}));

jest.mock("./AddAuthor.jsx", () => ({
  AddAuthor: jest.fn(() => <div data-testid="test-add-author"></div>),
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

describe("Admin", () => {
  it("navigates", () => {
    const history = createMemoryHistory();
    history.push("/");
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <Admin />
      </Router>
    );

    // Click sur le lien de navigation Add Book
    fireEvent.click(getByText(/admin.link.addBook/i));

    const admin = getByTestId("admin");
    expect(admin).toBeInTheDocument();

    const addBook = getByTestId("test-add-book");
    expect(addBook).toBeInTheDocument();

    // Click sur le lien de navigation Add Author
    fireEvent.click(getByText(/admin.link.addAuthor/i));

    const addAuthor = getByTestId("test-add-author");
    expect(addAuthor).toBeInTheDocument();
  });
});
