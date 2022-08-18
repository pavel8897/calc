<template>
  <header class="navbar navbar-expand-md navbar-dark bd-navbar">
    <ul class="navbar-nav flex-row flex-wrap bd-navbar-nav pt-2 py-md-0">
      <router-link :to="'/'">
        <li>Калькулятор</li>
      </router-link>
      <router-link
        to="/types"
        v-if="
          $store.state.activityType != '' && $store.state.productionType != ''
        "
      >
        <li>Типы расчетов</li>
      </router-link>
    </ul>
  </header>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "~bootstrap/scss/mixins";
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
$calculate-for-device-button-color: #7a6d49;
$hover-button-color: #ffffff;

$custom-btn-type-two-color: #6b6b6b;
$hover-custom-btn-type-two-color: #ffffff;

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #0d6efd;
}
.bd-navbar {
  padding: 0.75rem 0;
  background-color: #7952b3;
  margin-bottom: 1rem;
  color: white;
}
ul.navbar-nav a {
  color: white !important;
}
ul.navbar-nav a:hover {
  color: rgb(240, 227, 227) !important;
}
.navbar {
  position: sticky;
  top: 0;
}
</style>
