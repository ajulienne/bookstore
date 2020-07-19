<template>
  <div>
    <h1>{{ $t("admin.addAuthor.title") }}</h1>
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
    <form @submit.prevent="submitNewAuthor">
      <div class="control">
        <label for="name">{{
          $t("admin.addAuthor.form.controls.name.label")
        }}</label>
        <input type="text" name="name" id="name" v-model="name" />
      </div>
      <div>
        <input type="submit" :value="$t('admin.addAuthor.form.buttons.add')" />
      </div>
    </form>
  </div>
</template>

<script>
import { AuthorsService } from "../services/authors.service.js";

export default {
  name: "AddAuthor",
  data() {
    return {
      name: "",
      error: null,
      message: null,
      formErrors: [],
    };
  },
  methods: {
    submitNewAuthor() {
      if (this.validateForm()) {
        AuthorsService.addAuthor({
          name: this.name,
        })
          .then(() => {
            this.message = this.$t("admin.addAuthor.messages.addAuthorSuccess");
            this.resetForm();
          })
          .catch((err) => (this.error = err));
      }
    },
    validateForm() {
      let formIsValid = true;
      this.formErrors = [];

      if (!this.name) {
        this.formErrors.push(
          this.$t("admin.addAuthor.form.controls.name.required")
        );
        formIsValid = false;
      }

      return formIsValid;
    },
    resetForm() {
      this.name = "";
    },
  },
};
</script>

<style lang="scss"></style>
