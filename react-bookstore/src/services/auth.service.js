import { apis } from "./api";

/**
 * Authentification de l'utilisateur grâce à son email/pwd
 * @param {*} email Email de l'utilisateur
 * @param {*} password Mot de passe de l'utilisateur
 * @throws Une erreur si aucun utilisateur pour ce couple email/pwd n'a été trouvé
 */
export const authenticateUser = (email, password) => {
  return apis
    .get("users", {
      params: {
        email,
      },
    })
    .then((resp) => {
      console.log({
        data: resp.data,
        email,
        password,
      });
      if (resp.data.length > 0 && resp.data[0].password === password) {
        return resp.data[0];
      } else {
        throw new Error("auth.error.userNotFound");
      }
    });
};
