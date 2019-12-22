<template>
  <section class="hero is-medium is-primary is-bold">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          <slot></slot>
        </h1>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroCine'
}
</script>

<style lang="scss" scoped>
.title {
  font-family: quiroh, sans-serif;
  // font-family: 'BigNoodleTitling-Oblique', sans-serif;
  font-weight: 900;
  font-size: 4rem;
}
</style>
