export const StorageService = {
  get: (key) => {
    const data = window.localStorage.getItem(key);
    return key ? JSON.parse(data) : null;
  },
  set: (key, value) => window.localStorage.setItem(key, JSON.stringify(value)),
  delete: (key) => window.localStorage.removeItem(key),
};
