export const StorageService = {
  get: (key) => {
    const data = window.localStorage.getItem(key);
    return key ? JSON.parse(data) : null;
  },

  set: (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
  },

  delete: (key) => {
    window.localStorage.removeItem(key);
  },
};
