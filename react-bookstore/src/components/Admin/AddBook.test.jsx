import React from "react";
import { AddBook } from "./AddBook";
import { render, fireEvent, wait } from "@testing-library/react";
import { addBook } from "../../services/books.service";

// Note: Les fonctions/variables utilisées dans des 'jest.mock' doivent être préfixé de 'mock'
const mockAuthors = [
  {
    id: 1,
    name: "Author 1",
  },
  {
    id: 2,
    name: "Author 2",
  },
];

// Mock du service getAuthor
jest.mock("../../services/author.service", () => ({
  getAuthors: jest.fn(() => Promise.resolve(mockAuthors)),
}));

// Mock du service addBook
jest.mock("../../services/books.service", () => ({
  addBook: jest.fn(() => Promise.resolve({})),
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

describe("AddBook", () => {
  it("adds a new book", async () => {
    const newBook = {
      title: "title",
      author: "Author 1",
      stock: "10",
      summary: "summary",
      cover: "http://cover.png",
    };

    const { findByTestId } = render(<AddBook />);

    // Récupération des éléments et vérification qu'ils se trouvent bien dans le document
    const titleInput = await findByTestId("title");
    expect(titleInput).toBeInTheDocument();

    const authorInput = await findByTestId("author");
    expect(authorInput).toBeInTheDocument();

    const stockInput = await findByTestId("stock");
    expect(stockInput).toBeInTheDocument();

    const summaryInput = await findByTestId("summary");
    expect(summaryInput).toBeInTheDocument();

    const coverInput = await findByTestId("cover");
    expect(coverInput).toBeInTheDocument();

    const submitInput = await findByTestId("submit");
    expect(submitInput).toBeInTheDocument();

    // Remplissage du formulaire
    fireEvent.change(titleInput, { target: { value: newBook.title } });
    fireEvent.change(authorInput, { target: { value: newBook.author } });
    fireEvent.change(stockInput, { target: { value: newBook.stock } });
    fireEvent.change(summaryInput, { target: { value: newBook.summary } });
    fireEvent.change(coverInput, { target: { value: newBook.cover } });
    // Soumission du formulaire
    fireEvent.click(submitInput);

    // On vérifie que l'ajout de book est fait, avec les valeurs saisies dans le formulaire et non des valeurs vides
    // Pour faire fonctionner le toHaveBeenCalled, il faut avoir importé addBook dans le fichier, et avoir fait un jest.mock
    await wait(() => expect(addBook).toHaveBeenCalledWith(newBook));
  });
});
