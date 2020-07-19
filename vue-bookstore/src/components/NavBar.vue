<template>
  <nav>
    <div class="brand">Bookstore</div>
    <div class="links">
      <router-link active-class="active" to="/books">{{
        $t("navbar.booksLink")
      }}</router-link>
      <router-link active-class="active" to="/admin">{{
        $t("navbar.adminLink")
      }}</router-link>
    </div>
    <div class="auth">
      <template v-if="loggedUser">
        <div class="user">
          <img :src="dummyAvatar" :alt="loggedUser.username" />
          {{ loggedUser.username }}
        </div>
        |
        <button @click="logout">
          {{ $t("navbar.logoutLink") }}
        </button>
      </template>
      <router-link v-else :to="{ name: 'Login' }">
        {{ $t("navbar.loginLink") }}
      </router-link>
      <SwitchLang />
    </div>
  </nav>
</template>

<script>
import { getDummyAvatarFromUsername } from "../helpers";
import SwitchLang from "./SwitchLang";

export default {
  name: "NavBar",
  components: {
    SwitchLang,
  },
  computed: {
    loggedUser() {
      return this.$store.state.auth.loggedUser;
    },
    dummyAvatar() {
      return getDummyAvatarFromUsername(
        this.$store.state.auth.loggedUser.username,
        32
      );
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="scss">
nav {
  display: flex;
  height: 50px;
  background-color: #00629b;
  color: white;
  line-height: 50px;
  .brand {
    flex: 0.2;
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
    text-transform: uppercase;
    font-weight: 600;
  }
  .links {
    width: 1024px;
    text-align: left;
    display: flex;
    flex: 1;
  }
  .auth {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    .user {
      margin-right: 20px;
      display: flex;
      align-items: center;
      font-size: 1.2em;
      img {
        width: 32px;
        height: 32px;
        border-radius: 50px;
        margin-right: 10px;
      }
    }
  }
  a,
  button {
    box-sizing: border-box;
    padding: 0 20px 0 20px;
    display: inline-block;
    font-size: 1.2em;
    color: white;
    line-height: 50px;
    height: 50px;
    text-decoration: none;
    background-color: #00629b;
    border: none;
    cursor: pointer;
    outline: none;
    &.active,
    &:hover {
      background-color: #00a6d6;
      color: white;
    }
  }
}
</style>
