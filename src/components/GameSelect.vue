<template>
  <div class="column is-6 has-text-centered">
    <div
      class="wrapper game"
      :style="{ 'background-image': 'url(' + thumbnail + ')' }"
    >
      <router-link to="/cinematics/overwatch" class="overlay va">
        <h1 class="title">
          <slot name="title"></slot>
        </h1>
      </router-link>
    </div>
  </div>
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
.game {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 6px;
  min-height: 200px;
  width: 100%;
  border: 1px solid $primary;
  &:hover {
    .overlay {
      display: inline-flex;
      cursor: pointer;
    }
  }
  .overlay {
    display: none;
    border-radius: 6px;
    padding: 1rem;
    background: rgba($color: $primary, $alpha: 0.75);
    backdrop-filter: blur(5px) saturate(200%);
    min-height: 200px;
    width: 100%;
    .title {
      color: white;
    }
    .button {
      width: 150px;
    }
  }
}
</style>
