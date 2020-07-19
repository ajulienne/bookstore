import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBook } from "../../services/books.service";
import "./BookDetail.scss";

export const BookDetail = () => {
  const { id } = useParams();

  const [book, setBook] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    getBook(id)
      .then((book) => setBook(book))
      .catch((err) => setError(err));
  }, [id]);

  return (
    <div className="book-detail" data-testid="book-detail">
      {error && (
        <div className="error">
          <h1>{error.message}</h1>
          <pre>{error.stack}</pre>
        </div>
      )}
      {book && (
        <>
          <div className="summary">
            <Link to="/books">&larr; Back to list</Link>
            <h1 className="title" data-testid="book-title">
              {book.title}
            </h1>
            <h2 className="subtitle" data-testid="book-author">
              {book.author}
            </h2>
            <p data-testid="book-summary">{book.summary}</p>
          </div>
          <div className="infos">
            <img src={book.cover} alt="" />
          </div>
        </>
      )}
    </div>
  );
};
