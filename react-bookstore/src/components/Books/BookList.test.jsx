import React from "react";
import { render } from "@testing-library/react";
import { BookList } from "./BookList";

const mockData = [
  {
    id: "1",
    title: "Test Book 1",
    author: "Test Author 1",
  },
  {
    id: "2",
    title: "Test Book 2",
    author: "Test Author 2",
  },
];

jest.mock("../../services/books.service", () => ({
  getBooks: jest.fn(() => Promise.resolve(mockData)),
}));

jest.mock("./Book.jsx", () => ({
  Book: jest.fn(() => <div data-testid="test-book"></div>),
}));

describe("Booklist", () => {
  it("renders multiple books (async/await)", async () => {
    const { findAllByTestId } = render(<BookList />);

    const booklist = await findAllByTestId("test-book");
    expect(booklist.length).toBe(mockData.length);
  });

  it("renders multiple books (done)", (done) => {
    const { findAllByTestId } = render(<BookList />);

    findAllByTestId("test-book").then((items) => {
      expect(items.length).toBe(mockData.length);
      done();
    });
  });
});
