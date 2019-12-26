<template>
  <section class="hero is-large">
    <div class="hero-body">
      <div class="container has-text-centered">
        <img
          src="@/assets/img/logo-horizontal-dark.svg"
          width="400px"
          alt="OG Cinematics Logo"
        />
        <br /><br />
        <h1 class="title">
          Add <span class="text"><VueTyper :text="heroText"> </VueTyper></span>
          to your gaming videos
        </h1>
      </div>
    </div>
  </section>
</template>

<script>
if (process.browser) {
  var VueTyper = require('vue-typer').VueTyper
}
export default {
  name: 'HomeHero',
  components: {
    VueTyper
  },
  data() {
    return {
      heroText: ['cinematography', 'quality', 'beauty', 'detail', 'class']
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  background-color: #fff;
  background: url('../assets/hero-fallback.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-bottom: 2px solid $light-900;
  h1 {
    color: $primary !important;
  }
}
.vue-typer .char {
  color: #607d8b !important;
}
</style>
