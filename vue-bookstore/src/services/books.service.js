import { api } from "./api";

export const BookService = {
  getBooks: () => {
    return api.get("books").then((resp) => resp.data);
  },
  getBook: (bookId) => {
    return api.get(`books/${bookId}`).then((resp) => resp.data);
  },
  addBook: (book) => {
    return api.post("books", book).then((resp) => resp.data);
  },
};
