<template>
  <router-link
    tag="div"
    :to="{ name: 'BookDetails', params: { id: book.id } }"
    class="book"
  >
    <h1>
      {{ book.title }}
    </h1>
    <h2>{{ book.author }}</h2>
  </router-link>
</template>

<script>
export default {
  props: ["book"],
};
</script>

<style lang="scss">
.book {
  padding: 20px;
  &:hover {
    background-color: #eee;
    cursor: pointer;
  }
  .low {
    color: red;
  }
  .moderate {
    color: orange;
  }
  .normal {
    color: green;
  }
  h1 {
    font-size: 2em;
    margin: 0;
    a {
      text-decoration: none;
      color: inherit;
    }
  }
  h2 {
    font-size: 1.4em;
    color: #555;
    margin: 0;
  }
  button {
    border: none;
    background-color: #ddd;
    margin-left: 10px;
    width: 30px;
    cursor: pointer;
    outline: none;
    &:hover {
      background-color: #aaa;
    }
  }
}
</style>
