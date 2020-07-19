import { api } from "./api";

export const AuthService = {
  authenticateUser: (email, password) => {
    return api
      .get("users", {
        params: {
          email,
        },
      })
      .then((resp) => {
        if (resp.data.length > 0 && resp.data[0].password === password) {
          return resp.data[0];
        } else {
          throw new Error("auth.error.userNotFound");
        }
      });
  },
};
