# Bookstore

Simple bookstore app made with multiple JS framework and libraries:

- [Vue](http://vuejs.org)
- [React](http://reactjs.org)

Backend made with [JSON-server](https://github.com/typicode/json-server).

⚠ There is no security or validations on the backend and for the authentication, as this is not the goal of this exercise.

## Goal

The app is a fearly simple one that cover an array of common development practices in most appplications, such as :

- Multiple components, with nesting
- Global state management ([Redux](https://redux.js.org/), [Vuex](https://vuex.vuejs.org/))
- Routing
- Protected route for users
- Forms
- API calls
- Internationalization
- Unit testing

## Features

In this app, users can :

- See a list of books in the store, and click on each one to have a full detail of the book
- Change the language (english and french)
- Log in / Log out
- If logged in, the user can also:
  - Add books
  - Add authors

## Usage

To run the backend API, launch the following command :

```bash
npm run json
```

Then, each app can be run from its directory with the corresponding command.

- For React

```bash
npm run start
```

- For Vue

```bash
npm run serve
```
