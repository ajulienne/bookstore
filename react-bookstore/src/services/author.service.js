import { apis } from "./api";

/**
 * Récupère la liste des auteurs sur /authors
 */
export const getAuthors = () => {
  return apis.get("authors").then((resp) => resp.data);
};

/**
 * Ajoute un auteur
 * @param {*} author Objet de l'auteur contenant son nom
 */
export const addAuthor = (author) => {
  return apis.post("authors", author).then((resp) => resp.data);
};
