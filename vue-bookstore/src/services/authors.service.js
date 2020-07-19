import { api } from "./api";

export const AuthorsService = {
  getAuthors: () => {
    return api.get("authors").then((resp) => resp.data);
  },
  addAuthor: (author) => {
    return api.post("authors", author).then((resp) => resp.data);
  },
};
