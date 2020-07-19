<template>
  <div>
    <h1>{{ $t("admin.addBook.title") }}</h1>
    <div class="message">
      <div v-if="message" class="success">{{ message }}</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="formErrors.length" class="error">
        {{ $t("forms.errorList") }}
        <ul>
          <li v-for="(e, i) in formErrors" :key="i">{{ e }}</li>
        </ul>
      </div>
    </div>
    <form @submit.prevent="submitNewBook">
      <div class="control">
        <label for="title">{{
          $t("admin.addBook.form.controls.title.label")
        }}</label>
        <input type="text" name="title" id="title" v-model="title" />
      </div>
      <div class="control">
        <label for="author">{{
          $t("admin.addBook.form.controls.author.label")
        }}</label>
        <select name="author" id="author" v-model="author">
          <option disabled value="">{{
            $t("admin.addBook.form.controls.author.placeholder")
          }}</option>
          <option
            v-for="author in authors"
            :key="author.id"
            :value="author.name"
          >
            {{ author.name }}
          </option>
        </select>
      </div>
      <div class="control">
        <label for="stock">{{
          $t("admin.addBook.form.controls.stock.label")
        }}</label>
        <input type="number" name="stock" id="stock" min="0" v-model="stock" />
      </div>
      <div class="control">
        <label for="summary">{{
          $t("admin.addBook.form.controls.summary.label")
        }}</label>
        <textarea v-model="summary"></textarea>
      </div>
      <div class="control">
        <label for="cover">{{
          $t("admin.addBook.form.controls.cover.label")
        }}</label>
        <input
          type="url"
          placeholder="http://..."
          name="cover"
          id="cover"
          v-model="cover"
        />
      </div>
      <div>
        <input type="submit" :value="$t('admin.addBook.form.buttons.add')" />
      </div>
    </form>
  </div>
</template>

<script>
import { AuthorsService } from "../services/authors.service.js";
import { BookService } from "../services/books.service.js";

export default {
  name: "AddBook",
  data() {
    return {
      authors: [],
      title: "",
      author: "",
      stock: 0,
      summary: "",
      cover: "",
      error: null,
      message: null,
      formErrors: [],
    };
  },
  mounted() {
    AuthorsService.getAuthors().then((data) => {
      console.log("Fetching authors...");
      this.authors = data;
    });
  },
  methods: {
    submitNewBook() {
      if (this.validateForm()) {
        BookService.addBook({
          title: this.title,
          author: this.author,
          stock: this.stock,
          summary: this.summary,
          cover: this.cover,
        })
          .then(() => {
            this.message = this.$t("admin.addBook.messages.addBookSuccess");
            this.resetForm();
          })
          .catch((err) => (this.error = err));
      }
    },
    validateForm() {
      let formIsValid = true;
      this.formErrors = [];

      if (!this.title) {
        this.formErrors.push(
          this.$t("admin.addBook.form.controls.title.required")
        );
        formIsValid = false;
      }

      if (!this.author) {
        this.formErrors.push(
          this.$t("admin.addBook.form.controls.author.required")
        );
        formIsValid = false;
      }

      if (this.stock <= 0) {
        this.formErrors.push(
          this.$t("admin.addBook.form.controls.stock.required")
        );
        formIsValid = false;
      }

      return formIsValid;
    },
    resetForm() {
      this.title = "";
      this.author = "";
      this.stock = 0;
      this.summary = "";
      this.cover = "";
    },
  },
};
</script>

<style lang="scss"></style>
