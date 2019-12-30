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
          <router-link to="/test" class="navbar-item">About</router-link>

          <router-link to="/cinematics" class="navbar-item"
            >Cinematics</router-link
          >

          <!-- <a class="navbar-item">FAQ's</a>
          <a class="navbar-item">Support</a> -->
        </div>
        <div class="navbar-end">
          <b-dropdown
            v-if="isAuthed"
            position="is-bottom-left"
            aria-role="menu"
          >
            <a class="navbar-item" slot="trigger" role="button">
              <span style="padding-right: 10px; ">Menu</span>
              <i class="fad fa-bars" style="transform: translateY(10%);"></i>
            </a>

            <b-dropdown-item class="va" custom aria-role="menuitem">
              Logged as <b>{{ userProfile.email }}</b>
            </b-dropdown-item>
            <hr class="dropdown-divider" />
            <b-dropdown-item class="va" aria-role="menuitem">
              <router-link to="/account">
                <i class="fal fa-cogs"></i>&emsp; My Account
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item class="va" aria-role="menuitem">
              <router-link to="/account">
                <i class="fal fa-comment-smile"></i>&emsp; Give Feedback
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item class="va" aria-role="menuitem">
              <router-link to="/cinematics/overwatch">
                <i class="fal fa-comment-alt-exclamation"></i>&emsp; Request
                Overwatch Cinematics
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item
              @click="signOut"
              value="logout"
              aria-role="menuitem"
            >
              <i class="fad fa-sign-out"></i>&emsp; &emsp; Log Out
            </b-dropdown-item>
            <hr class="dropdown-divider" v-if="userProfile.isAdmin" />
            <b-dropdown-item
              v-if="userProfile.isAdmin"
              class="va"
              aria-role="menuitem"
            >
              <router-link to="/admin" style="color: red;">
                <i class="fad fa-user-shield"></i>&emsp;
                <strong>Admin Panel</strong>
              </router-link>
            </b-dropdown-item>
          </b-dropdown>
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/register" v-if="!isAuthed" class="button is-og">
                <strong>Sign up</strong>
              </router-link>
              <router-link
                v-if="!isAuthed"
                to="/login"
                class="button is-primary"
              >
                Log in
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from '@firebase/app'
import '@firebase/auth'

export default {
  data() {
    return {
      isOpen: false,
      respones: undefined
    }
  },
  computed: {
    ...mapGetters(['isAuthed', 'userId', 'userProfile'])
  },
  created() {},
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(response => {
          this.response = response
          this.$store.dispatch('resetStateOnLogout')
          this.$router.push({ path: '/login' })
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
  background: rgba($color: $light-300, $alpha: 0.9) !important;
  backdrop-filter: saturate(200%) blur(10px) !important;
}
.navbar-item {
  color: $light-900;
  letter-spacing: 0.05rem;
  font-family: nunito-sans, sans-serif;
}
// reset offset of fontawesome icons
.fa {
  transform: translateY(-4%);
}
</style>
