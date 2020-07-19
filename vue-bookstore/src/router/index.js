import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/books",
    component: () =>
      import(/*webpackChunkName: "admin" */ "../views/Books.vue"),
    children: [
      {
        path: ":id",
        name: "BookDetails",
        component: () =>
          import(
            /*webpackChunkName: "admin" */ "../components/BookDetails.vue"
          ),
      },
      {
        path: "",
        name: "BookList",
        component: () =>
          import(/*webpackChunkName: "admin" */ "../components/BookList.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    beforeEnter: (to, from, next) => {
      if (store.state.auth.loggedUser) {
        next();
      } else {
        next({ name: "Login", query: { redirect: to.name } });
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/*webpackChunkName: "admin" */ "../views/Admin.vue"),
    children: [
      {
        path: "add-book",
        name: "AddBook",
        component: () =>
          import(/*webpackChunkName: "admin" */ "../components/AddBook.vue"),
      },
      {
        path: "add-author",
        name: "AddAuthor",
        component: () =>
          import(/*webpackChunkName: "admin" */ "../components/AddAuthor.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/*webpackChunkName: "admin" */ "../views/Login.vue"),
  },
  {
    path: "/",
    redirect: { name: "BookList" },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
