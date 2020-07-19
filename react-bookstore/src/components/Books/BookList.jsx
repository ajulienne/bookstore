import React, { useState, useEffect } from "react";
import { getBooks } from "../../services/books.service";
import { Book } from "./Book";
import "./BookList.scss";

export const BookList = (props) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => {
        console.error(err);
        setBooks([]);
      });
  }, []);

  return (
    <div data-testid="booklist" className="book-list">
      {books.map((b) => (
        <Book key={`book-${b.title.replace(" ", "_")}`} book={b} />
      ))}
    </div>
  );
};
