<template>
  <div id="app">
    <NavBar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar,
  },
  created() {
    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #1d2b36;
  line-height: 24px;
}
code,
pre {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
.title {
  font-size: 3em;
}
.subtitle {
  font-size: 2em;
  color: #777;
}

.container {
  width: 1024px;
  margin: auto;
}
a {
  text-decoration: none;
  color: #00629b;
  &:hover {
    color: #00a6d6;
  }
}
.message {
  display: block;
  color: white;
  box-sizing: border-box;
  font-size: 1.2em;
  margin-bottom: 20px;
  .success {
    background-color: #34bf49;
    padding: 20px;
  }
  .error {
    background-color: #ff4c4c;
    padding: 20px;
  }
}
form {
  label,
  input:not([type="submit"]),
  textarea,
  select {
    display: block;
    width: 500px;
    outline: none;
    box-sizing: border-box;
    background-color: white;
  }
  label {
    font-weight: 500;
  }
  .control {
    margin-bottom: 20px;
    .control-error {
      color: red;
    }
  }
  input,
  select,
  textarea {
    padding: 10px;
    border: none;
    border-bottom: 1px solid #aaa;
    &:hover,
    &:focus {
      background-color: #fafafa;
    }
    &:focus {
      border-bottom: 2px solid #00629b;
    }
  }
  textarea {
    width: 100%;
  }
  input[type="submit"] {
    width: 100px;
    color: white;
    cursor: pointer;
    border: none;
    background-color: #00629b;
    outline: none;
    &:hover {
      background-color: #00a6d6;
    }
  }
}
</style>
