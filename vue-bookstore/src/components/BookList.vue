<template>
  <div class="book-list">
    <Book v-for="book in books" v-bind:key="book.id" v-bind:book="book"></Book>
  </div>
</template>

<script>
import { BookService } from "../services/books.service.js";
import Book from "./Book";

export default {
  name: "BookList",
  components: {
    Book,
  },
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    console.log("Fetching books...");
    BookService.getBooks().then((data) => {
      this.books = data;
    });
  },
};
</script>

<style lang="scss">
.book-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  row-gap: 20px;
  margin-top: 20px;
}
</style>
