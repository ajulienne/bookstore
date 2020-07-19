<template>
  <div class="book-detail" v-if="book">
    <div class="summary">
      <router-link to="/books">&larr; {{ $t("booklist.back") }}</router-link>
      <h1 class="title">
        {{ book.title }}
      </h1>
      <h2 class="subtitle">
        {{ book.author }}
      </h2>
      <p>{{ book.summary }}</p>
    </div>
    <div class="infos">
      <img v-bind:src="book.cover" alt="" />
    </div>
  </div>
  <div v-else>Loading book infos...</div>
</template>

<script>
import { BookService } from "../services/books.service.js";

export default {
  name: "BookDetails",
  data() {
    return {
      book: null,
    };
  },
  mounted() {
    BookService.getBook(this.$route.params.id).then(
      (data) => (this.book = data)
    );
  },
};
</script>

<style lang="scss">
.book-detail {
  .summary {
    display: inline-block;
    width: 60%;
    vertical-align: top;
    margin-top: 20px;
    p {
      font-size: 1.1em;
      text-align: justify;
      white-space: pre-wrap;
    }
  }
  .error {
    color: red;
  }
  .infos {
    display: inline-block;
    width: 30%;
    vertical-align: top;
    margin-top: 50px;
    margin-left: 10%;
    img {
      width: 100%;
    }
  }
}
</style>
