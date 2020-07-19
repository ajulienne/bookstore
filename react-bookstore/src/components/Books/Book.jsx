import React, { useState, useEffect } from "react";
import "./Book.scss";
import { updateBook } from "../../services/books.service";
import { Link } from "react-router-dom";

export const Book = ({ book }) => {
  const [stock, setStock] = useState(book.stock);

  const [stockStatus, setStockStatus] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const incrementStock = () => updateStock(true);

  const decrementStock = () => updateStock(false);

  /**
   * Met à jour le stock
   * @param {boolean} action true : increment ; false : decrement
   */
  const updateStock = (action) => {
    const newStock = action ? stock + 1 : stock - 1;
    setStock(newStock);

    updateBook(book.id, {
      stock: newStock,
    }).then((updatedBook) => {
      // Mise à jour si ça à bougé côté serveur
      if (updatedBook !== stock) {
        setStock(updatedBook.stock);
      }
      setErrorMessage(null);
    });
  };

  useEffect(() => {
    // Modification du state de className pour l'affichage du stock
    if (stock < 2) {
      setStockStatus("low");
    } else if (stock < 5) {
      setStockStatus("moderate");
    } else {
      setStockStatus("normal");
    }
  }, [stock]);

  return (
    <div className="book" data-testid="book-wrapper">
      <h1 data-testid="book-name">
        <Link to={`/books/${book.id}`}>{book.title}</Link>
      </h1>
      <h2 data-testid="book-author">{book.author}</h2>
      <div>
        Stock :{" "}
        <span data-testid="stock" className={stockStatus}>
          {stock}
        </span>
        <button data-testid="decrement-button" onClick={decrementStock}>
          -
        </button>
        <button data-testid="increment-button" onClick={incrementStock}>
          +
        </button>
        {errorMessage && <span>{errorMessage}</span>}
      </div>
    </div>
  );
};
