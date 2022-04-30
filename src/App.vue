<template>
  <div id="app">
    <div
      class="py-4 has-text-center"
      style="background: #0058b5; color: #ffd506"
    >
      <center>
        <p>
          Cinematics downloads have been blocked from all Russian IP Addresses.
          Slava Ukraini!
        </p>
      </center>
    </div>
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
    BaseFooter,
  },
  computed: {
    currentRoute() {
      return this.$router.currentRoute.name
    },
  },
  methods: {
    dismissGlobalNotification() {
      let x = document.getElementById('globalNotification')
      x.style.display = 'none'
    },
  },
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
    font-family: 'Inter' sans-serif;
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
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
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
