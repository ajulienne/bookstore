<template>
  <div class="admin">
    <ul class="admin-links">
      <li>
        <router-link :to="{ name: 'AddBook' }" active-class="active">{{
          $t("admin.link.addBook")
        }}</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'AddAuthor' }" active-class="active">{{
          $t("admin.link.addAuthor")
        }}</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Admin",
};
</script>

<style lang="scss">
.admin {
  margin-left: 20px;
  ul.admin-links {
    margin: 0;
    padding: 0;
    list-style-type: none;
    li {
      display: inline-block;
      margin: 10px 20px 10px 0;
      a.active {
        border-bottom: 1px solid #00629b;
      }
    }
  }
}
</style>
