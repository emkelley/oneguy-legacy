<template>
  <div id="register">
    <div id="app">
      <div class="login-card">
        <div class="card-title va">
          <center>
            <img src="~@/assets/img/logo-horizontal-white.svg" width="250" />
          </center>
          <br />
          <strong style="color: white" class=" has-text-centered">
            Create A New Account
          </strong>
        </div>
        <div v-if="!confirmation" class="content">
          <form method="POST" @keydown.enter="validate" action="#">
            <input
              id="name"
              v-model="name"
              type="text"
              name="Name"
              title="Name"
              placeholder="Name (e.g., OneGuy or Eric)"
              required
              autofocus
            />

            <input
              id="email"
              v-model="email"
              type="email"
              name="Email"
              title="Email"
              placeholder="Email"
              required
              autofocus
            />
            <input
              id="password"
              v-model="password"
              type="password"
              name="Password"
              title="Password"
              placeholder="Password"
              required
            />
            <input
              id="passwordConfirmation"
              v-model="passwordConfirmation"
              type="password"
              name="Password Confirmation"
              title="Password Confirmation"
              placeholder="Confirm Password"
              required
            />
            <button
              type="submit"
              class="button is-primary login-btn is-medium is-outlined"
              :class="{ 'is-loading': isLoading }"
              :disabled="isLoading"
            >
              Register
            </button>
          </form>
          <br />
        </div>
        <div v-else class="content has-text-centered va">
          <i class="fad fa-user-check fa-4x" style="color: #031b4e"></i>
          <h2 class="subtitle">Welcome Aboard!</h2>
          <p>
            We've just sent you over a confirmation email to activate your
            account and to allow you to download cinematics.
          </p>
          <br />
          <router-link to="/login" class="button is-primary is-outlined"
            >Back to Login</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/main'
import firebase from '@firebase/app'
import '@firebase/auth'
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      isLoading: false,
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: [],
      confirmation: false
    }
  },
  computed: {
    ...mapGetters(['isAuthed', 'userId', 'userProfile'])
  },
  created() {
    if (this.isAuthed) {
      this.$router.replace('/')
    }
  },
  methods: {
    validate() {
      this.isLoading = true
      if (this.name.length < 3) {
        this.errors.push({
          type: 'Name must be greater than 2 characters'
        })
      }
      if (this.password !== this.passwordConfirmation) {
        this.errors.push({
          type: 'Nickname must be greater than 3 characters'
        })
      }
      if (this.errors.length === 0) {
        this.register()
      }
      // https://open.kickbox.com/v1/disposable/mailinator.com returns disposable true
    },
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          if (user.user.emailVerified === false) {
            user.user.sendEmailVerification()
          }
          const dateNow = new Date()
          let userId = user.user.uid
          db.collection('users')
            .doc(userId)
            .set({
              id: userId,
              accountCreated: dateNow,
              donator: false,
              email: this.email,
              isAdmin: false,
              username: this.name
            })
            .then(() => {
              this.isLoading = false
              this.confirmation = true
            })
        })
        .catch(err => {
          this.error = err.message
        })
    }
  }
}
</script>

<style lang="scss" scoped>
$grey-darker: hsl(0, 0%, 21%);
$grey-dark: hsl(0, 0%, 29%);
$grey: hsl(0, 0%, 48%);
$grey-light: hsl(0, 0%, 71%);
$grey-lighter: hsl(0, 0%, 86%);

#register {
  margin-top: -52px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.701) 0%,
      rgba(255, 255, 255, 0.612) 100%
    ),
    url('../../assets/hero-fallback.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  backdrop-filter: saturate(200%) blur(10px) !important;
  .login-card {
    background: #fff;
    width: 24rem;
    box-shadow: $shadow-large;
    border-radius: 10px;

    .card-title {
      background-color: darken($primary, 5%);
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      padding: 2rem;

      h1 {
        color: #fff;
        text-align: center;
        font-size: 1.2rem;
      }
    }
    .content {
      padding: 3rem 2.5rem 2rem;
    }
    #email,
    #password,
    #passwordConfirmation,
    #name {
      display: block;
      width: 100%;
      font-size: 1rem;
      margin-bottom: 1.75rem;
      padding: 0.25rem 0;
      border: none;
      border-bottom: 1px solid $grey-lighter;
      transition: all 0.5s;

      &:hover {
        border-color: $grey;
      }

      &:active,
      &:focus {
        border-color: $primary;
      }
    }
    .checkbox {
      color: $grey-light;
      font-size: 0.8rem;

      span {
        margin-left: 0.5rem;
      }
    }

    .options {
      color: $grey-light;
      margin-bottom: 1.5rem;
    }
  }
}

.fa {
  color: $primary !important;
}
.modal {
  background: white;
  padding: 2rem;
}
#app {
  backdrop-filter: saturate(200%) blur(10px) !important;
}
label {
  cursor: pointer;
}

.regular-checkbox {
  display: none;
}

.regular-checkbox + label {
  background-color: #fafafa;
  border: 1px solid $grey-lighter;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 7px;
  border-radius: 3px;
  display: inline-block;
  position: relative;
}

.regular-checkbox:checked + label {
  background-color: #e9ecee;
}

.regular-checkbox:checked + label:after {
  content: '\2714';
  font-size: 11px;
  position: absolute;
  top: 0;
  left: 3px;
  color: $grey-light;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}

.login-btn {
  width: 100%;
  height: 3rem;
  a {
    font-size: 1.5rem;
  }
}
</style>
