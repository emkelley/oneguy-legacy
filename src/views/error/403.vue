<template>
  <main class="va">
    <center>
      <div class="error-container has-text-centered">
        <h1 class="title">403</h1>
        <h2 class="subtitle">
          You don't have permissions to access this page.
        </h2>
        <router-link to="/" class="button is-primary is-rounded"
          >Back Home</router-link
        ><br />
      </div>
    </center>
  </main>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
main {
  min-height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.701) 0%,
      rgba(255, 255, 255, 0.612) 100%
    ),
    url('../../assets/hero-fallback.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  .error-container {
    width: 500px;
  }
}
</style>
