<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img
            src="@/assets/img/logo-horizontal-dark.svg"
            width="130"
            height="28"
          />
        </router-link>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="burger"
          :class="{ 'is-active': isOpen }"
          @click="isOpen = !isOpen"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="burger" class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link to="/about" class="navbar-item">About</router-link>

          <router-link to="/cinematics/overwatch" class="navbar-item"
            >Overwatch Cinematics</router-link
          >

          <!-- <a class="navbar-item">FAQ's</a>
          <a class="navbar-item">Support</a> -->
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <a
              v-if="isAuthed()"
              @click="signOut"
              class="button is-inverted is-primary"
              custom
              aria-role="menuitem"
            >
              <i class="fad fa-sign-out" style="margin-right: .5rem"></i>Log Out
            </a>
            <router-link
              v-if="!isAuthed()"
              to="/login"
              class="button is-primary"
            >
              Log in
            </router-link>
          </div>

          <div class="navbar-item">
            <div class="buttons"></div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from '@firebase/app'
import '@firebase/auth'
export default {
  data() {
    return {
      isOpen: false,
      respones: undefined,
      userAvatar: null,
      displayName: null,
      loading: true
    }
  },
  mounted() {
    this.isAuthed()
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ path: '/' })
        })
        .catch(function(error) {
          alert('An error occurred when signing out: ' + error)
        })
    },
    isAuthed() {
      let user = firebase.auth().currentUser
      if (user) {
        this.userAvatar = user.photoURL
        this.displayName = user.displayName
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  background: rgba($color: $light-300, $alpha: 0.9) !important;
  backdrop-filter: saturate(200%) blur(10px) !important;
}
.navbar-item {
  color: $light-900;
  letter-spacing: 0.05rem;
  font-family: nunito-sans, sans-serif;
}
</style>
