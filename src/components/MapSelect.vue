<template>
  <div class="og-card">
    <div class="og-card-header">
      <nav class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              <slot name="header"></slot>
            </p>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <slot name="availability"></slot>
          </div>
        </div>
      </nav>
    </div>
    <div
      class="og-card-body"
      :style="{ 'background-image': 'url(' + thumbnail + ')' }"
    >
      <slot name="body"></slot>
    </div>
    <div class="og-card-footer">
      <nav class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <slot name="foot-left"></slot>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <slot name="foot-right"></slot>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      default: 'https://cdn.oneguy.io/app/card-fallback.jpg',
      type: String
    }
  },
  computed: {
    thumbnail() {
      return this.url || 'https://cdn.oneguy.io/app/card-fallback.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
.og-card {
  border-radius: 6px;
  box-shadow: $shadow-large;
  transition: 0.05s all ease-in-out;
  border: 1px solid $light-600;
  .og-card-header,
  .og-card-footer {
    padding: 1rem;
    font-family: nunito-sans, sans-serif !important;
    .subtitle {
      color: $primary;
      strong {
        color: $primary;
      }
    }
  }
  .og-card-header {
    background: rgba($color: #fff, $alpha: 0.5) !important;
    backdrop-filter: saturate(200%) blur(5px) !important;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    font-family: nunito-sans, sans-serif !important;
    z-index: 99;
  }
  .og-card-body {
    margin-top: -57px;
    min-height: 250px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
  .og-card-footer {
    background: $light-400;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }
}
</style>
