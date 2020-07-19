import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Book } from "./Book";

jest.mock("react-router-dom", () => ({
  Link: jest.fn(() => <div data-testid="link" />),
}));

describe("Book", () => {
  const testBook = {
    title: "TestBook",
    author: "TestAuthor",
    stock: 5,
  };

  it("renders the title", () => {
    const { getByTestId } = render(<Book book={testBook} />);

    const bookAuthor = getByTestId("book-author");
    expect(bookAuthor).toBeInTheDocument();
    expect(bookAuthor.textContent).toBe(testBook.author);
  });

  it("increments the stock", () => {
    const { getByTestId } = render(<Book book={testBook} />);

    const clickPlusButton = getByTestId("increment-button");
    expect(clickPlusButton).toBeInTheDocument();

    const stock = getByTestId("stock");
    expect(stock).toBeInTheDocument();

    fireEvent.click(clickPlusButton);
    expect(stock).toHaveTextContent(testBook.stock + 1);
  });

  it("decrements the stock", () => {
    const { getByTestId } = render(<Book book={testBook} />);

    const clickMinusButton = getByTestId("decrement-button");
    expect(clickMinusButton).toBeInTheDocument();

    const stock = getByTestId("stock");
    expect(stock).toBeInTheDocument();

    fireEvent.click(clickMinusButton);
    expect(stock).toHaveTextContent(testBook.stock - 1);
  });

  it("updates the stock status", () => {
    const { getByTestId } = render(<Book book={testBook} />);

    const clickMinusButton = getByTestId("decrement-button");
    expect(clickMinusButton).toBeInTheDocument();

    const stock = getByTestId("stock");
    expect(stock).toBeInTheDocument();

    expect(stock).toHaveClass("normal"); // 5

    fireEvent.click(clickMinusButton);
    expect(stock).toHaveClass("moderate"); // 4

    fireEvent.click(clickMinusButton); // 3
    fireEvent.click(clickMinusButton); // 2
    fireEvent.click(clickMinusButton); // 1
    expect(stock).toHaveClass("low");
  });
});
