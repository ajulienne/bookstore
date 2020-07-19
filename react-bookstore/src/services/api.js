import axios from "axios";

// Configuration pour spécifier la basUrl
export const apis = axios.create({
  baseURL: "http://localhost:4000",
});
