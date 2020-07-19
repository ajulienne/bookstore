import { apis } from "./api";

/**
 * Récupère la liste des livres sur /books
 */
export const getBooks = () => {
  return apis.get("books").then((resp) => resp.data);
};

/**
 * Met à jour un livre grâce à son ID
 * @param {*} id ID du livre à modifier
 * @param {*} patch Object contenant les propriétés du livre à mettre à jour
 */
export const updateBook = (id, patch) => {
  return apis.patch(`books/${id}`, patch).then((resp) => resp.data);
};

/**
 * Récupère un livre grâce à son ID
 * @param {*} id ID du livre à récupérer
 */
export const getBook = (id) => {
  return apis.get(`books/${id}`).then((resp) => resp.data);
};

/**
 * Ajoute un livre
 * @param {*} book Objet du livre
 */
export const addBook = ({ title, author, stock, summary, cover }) => {
  return apis.post("books", { title, author, stock: +stock, summary, cover }).then((resp) => resp.data);
};
