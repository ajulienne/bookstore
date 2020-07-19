<template>
  <div>
    <h1>{{ $t("login.title") }}</h1>
    <div class="message">
      <div v-if="message" class="success">{{ message }}</div>
      <div v-if="error && !formErrors.length" class="error">
        {{ $t(error) }}
      </div>
      <div v-if="isRedirect && !error" class="error">
        {{ $t("login.errorMessages.mustBeLoggedIn") }}
      </div>
      <div v-if="formErrors.length" class="error">
        {{ $t("forms.errorList") }}
        <ul>
          <li v-for="(e, i) in formErrors" :key="i">{{ e }}</li>
        </ul>
      </div>
    </div>
    <form @submit.prevent="authenticate">
      <div class="control">
        <label for="email">{{ $t("login.form.controls.email.label") }}</label>
        <input type="email" name="email" id="email" v-model="email" />
      </div>
      <div class="control">
        <label for="password">{{
          $t("login.form.controls.password.label")
        }}</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
        />
      </div>
      <div>
        <input type="submit" :value="$t('login.form.buttons.login')" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      formErrors: [],
      message: null,
    };
  },
  computed: {
    error() {
      return this.$store.state.auth.error;
    },
    isRedirect() {
      return this.$route.query.redirect ? true : false;
    },
  },
  methods: {
    authenticate() {
      if (this.validateForm()) {
        this.$store
          .dispatch("authenticate", {
            email: this.email,
            password: this.password,
          })
          .then(() =>
            this.$router.push({
              name: this.$route.query.redirect || "BookList",
            })
          )
          .catch(() => console.error("Login error"));
      }
    },
    validateForm() {
      let formIsValid = true;
      this.formErrors = [];

      if (!this.email) {
        this.formErrors.push(this.$t("login.form.controls.email.required"));
        formIsValid = false;
      }

      if (!this.password) {
        this.formErrors.push(this.$t("login.form.controls.password.required"));
        formIsValid = false;
      }

      return formIsValid;
    },
  },
};
</script>
