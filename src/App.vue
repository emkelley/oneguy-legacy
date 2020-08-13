<template>
  <div id="app">
    <article id="globalNotification" class="notification is-primary global">
      <button
        type="button"
        aria-label="Close notification"
        class="delete"
        @click="dismissGlobalNotification"
      ></button>
      <div class="media">
        <!---->
        <div class="media-content has-text-centered">
          <b-icon icon="info-circle" size="is-small" pack="fad"></b-icon>
          To ease up on the system a little bit, all logins are now done with
          social networks
          <span style="margin-left: 1.25rem">- llOneGuyll</span>
        </div>
      </div>
    </article>
    <BaseNavbar v-if="currentRoute !== 'login'" />
    <router-view :key="$route.fullPath" />
    <BaseFooter />
  </div>
</template>
<script>
import BaseNavbar from '@/components/base/BaseNavbar.vue'
import BaseFooter from '@/components/base/BaseFooter.vue'
export default {
  components: {
    BaseNavbar,
    BaseFooter
  },
  computed: {
    currentRoute() {
      return this.$router.currentRoute.name
    }
  },
  methods: {
    dismissGlobalNotification() {
      let x = document.getElementById('globalNotification')
      x.style.display = 'none'
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/styles/overrides.scss';

.va {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

// reset offset of fontawesome icons
.fad {
  transform: translateY(-4%);
}
.og-section {
  padding-top: 8rem;
  padding-bottom: 8rem;
  .title {
    line-height: 3rem;
    span {
      color: $primary;
      font-weight: 900;
    }
  }
  .body {
    font-family: 'nunito-sans' sans-serif;
  }
}
// @font-face {
//   font-family: 'BigNoodleTitling-Oblique';
//   src: url('@/assets/fonts/BigNoodleTitlingOblique.woff2');
//   src: url('@/assets/fonts/BigNoodleTitlingOblique.otf') format('opentype'),
//     url('@/assets/fonts/BigNoodleTitlingOblique.svg') format('svg'),
//     url('@/assets/fonts/BigNoodleTitlingOblique.ttf') format('truetype'),
//     url('@/assets/fonts/BigNoodleTitlingOblique.woff') format('woff'),
//     url('@/assets/fonts/BigNoodleTitlingOblique.woff2') format('woff2');
//   font-weight: normal;
//   font-style: normal;
// }
#app {
  font-family: 'nunito-sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif !important;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.notification {
  &.global {
    border-radius: 0;
    margin-bottom: 0 !important;
  }
}
</style>
