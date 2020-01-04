<template>
  <article class="article column is-6 has-text-centered">
    <div class="columns is-multiline wrapper">
      <div
        class="column is-12 img game-selection "
        :style="{ 'background-image': 'url(' + thumbnail + ')' }"
      ></div>
      <div class="column va">
        <br />
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Game</p>
              <p class="title">
                <slot name="title"></slot>
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Maps</p>
              <p class="title">21</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Cinematics</p>
              <p class="title">680</p>
            </div>
          </div>
        </nav>
        <h1 class="title"></h1>
        <router-link
          to="/cinematics/overwatch"
          class="button is-primary is-medium"
        >
          View Cinematics
        </router-link>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Untitled Game'
    },
    cover: {
      default: 'https://cdn.oneguy.io/app/card-fallback.jpg',
      type: String
    }
  },
  computed: {
    thumbnail() {
      return this.cover || 'https://cdn.oneguy.io/app/card-fallback.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  padding: 1.5rem !important;
}
.img {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.game-selection {
  height: 200px;
  .button {
    max-width: 150px;
  }
}
.wrapper {
  border: 1px solid $primary;
  border-radius: 6px;
}
</style>
