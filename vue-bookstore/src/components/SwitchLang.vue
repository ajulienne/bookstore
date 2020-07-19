<template>
  <button @click="switchLang">{{ $i18n.locale | uppercase }}</button>
</template>

<script>
export default {
  name: "SwitchLang",
  methods: {
    switchLang() {
      if (this.$i18n.locale === "en") {
        this.$i18n.locale = "fr";
      } else {
        this.$i18n.locale = "en";
      }
    },
  },
  filters: {
    uppercase(value) {
      if (!value) return "";
      return value.toUpperCase();
    },
  },
};
</script>

<style lang="scss"></style>
