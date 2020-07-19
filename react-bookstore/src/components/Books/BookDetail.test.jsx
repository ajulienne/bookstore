import React from "react";
import { BookDetail } from "./BookDetail";
import { render } from "@testing-library/react";

const mockBook = {
  id: 1,
  title: "title",
  author: "author",
  summary: "summary",
};

jest.mock("../../services/books.service", () => ({
  getBook: jest.fn(() => Promise.resolve(mockBook)),
}));

jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: 1 }),
  Link: jest.fn(() => <div data-testid="link">Link</div>),
}));

describe("BookDetail", () => {
  it("displays the book", async () => {
    const { findByTestId } = render(<BookDetail />);

    const bookDetail = await findByTestId("book-detail");
    const bookTitle = await findByTestId("book-title");
    const bookAuthor = await findByTestId("book-author");
    const bookSummary = await findByTestId("book-summary");

    expect(bookDetail).toBeInTheDocument();
    expect(bookTitle).toBeInTheDocument();
    expect(bookAuthor).toBeInTheDocument();
    expect(bookSummary).toBeInTheDocument();

    expect(bookTitle).toHaveTextContent(mockBook.title);
    expect(bookAuthor).toHaveTextContent(mockBook.author);
    expect(bookSummary).toHaveTextContent(mockBook.summary);
  });
});
