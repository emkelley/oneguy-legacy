<template>
  <nav
    class="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
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

          <router-link to="/usage" class="navbar-item">Usage</router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Games
            </a>

            <div class="navbar-dropdown">
              <router-link to="/cinematics/overwatch" class="navbar-item"
                ><i class="fak fa-ow"></i> Overwatch</router-link
              >
              <hr class="navbar-divider" />
              <a class="navbar-item">
                <i class="fas fa-vote-yea"></i>
                Request a Game
              </a>
            </div>
          </div>

          <!-- <a class="navbar-item">FAQ's</a>
          <a class="navbar-item">Support</a> -->
        </div>
        <div class="navbar-end">
          <div v-if="isAuthed" class="navbar-item">
            Welcome back, {{ userProfile.given_name }}
            <button
              @click="signOut"
              class="button is-primary is-light"
              custom
              aria-role="menuitem"
              style="margin-left: 1rem"
            >
              <i class="fad fa-sign-out" style="margin-right: .5rem"></i>
              Log Out
            </button>
          </div>
          <div v-else class="navbar-item">
            <router-link to="/login" class="button is-primary">
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
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters(['isAuthed', 'userProfile'])
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit('isAuthed', false)
          this.$router.replace('/login')
        })
        .catch(function(error) {
          alert('An error occurred when signing out: ' + error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  background: rgba($color: $light-300, $alpha: 0.5) !important;
  backdrop-filter: saturate(200%) blur(10px) !important;
  border-bottom: 1px solid $light-600;
}
.navbar-item {
  color: $light-900;
  letter-spacing: 0.05rem;
  font-family: nunito-sans, sans-serif;
  i,
  svg {
    margin-right: 0.5rem;
  }
}
</style>
