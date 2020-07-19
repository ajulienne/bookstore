import Vue from "vue";
import Vuex from "vuex";
import { AuthService } from "../services/auth.service.js";
import { StorageService } from "../services/storage.service.js";

Vue.use(Vuex);

const USER_KEY = "user";

const store = new Vuex.Store({
  state: {
    auth: {
      loggedUser: null,
      error: null,
      loading: null,
    },
  },
  mutations: {
    init(state, payload) {
      state.auth = {
        ...state.auth,
        loggedUser: payload,
        error: null,
        loading: false,
      };
    },
    loginSuccess(state, payload) {
      state.auth = {
        ...state.auth,
        loggedUser: payload,
        error: null,
        loading: false,
      };
    },
    loginFailure(state, payload) {
      state.auth = {
        ...state.auth,
        loggedUser: null,
        error: payload,
        loading: false,
      };
    },
    login(state) {
      state.auth = {
        ...state.auth,
        loading: true,
      };
    },
    logout(state) {
      state.auth.loggedUser = null;
    },
  },
  actions: {
    authenticate({ commit }, payload) {
      commit("login");
      return new Promise((resolve, reject) => {
        AuthService.authenticateUser(payload.email, payload.password)
          .then((user) => {
            StorageService.set(USER_KEY, user);
            commit("loginSuccess", user);
            resolve();
          })
          .catch((err) => {
            commit("loginFailure", err.message);
            reject();
          });
      });
    },
    logout({ commit }) {
      StorageService.delete(USER_KEY);
      commit("logout");
    },
    init({ commit }) {
      const userInStorage = StorageService.get(USER_KEY);
      if (userInStorage) {
        commit("init", userInStorage);
      }
    },
  },
});

export default store;
