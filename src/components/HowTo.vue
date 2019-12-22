<template>
  <section class="how-wrapper">
    <div class="container ">
      <div class="title-group">
        <h1 class="title is-2">Getting started is easy as 1, 2, 3</h1>
      </div>
      <div class="columns is-multiline">
        <div class="column is-12 va">
          <div class="columns">
            <div class="column register">
              <div class>
                <i class="fad fa-browser fa-4x"></i>
                <br />
                <h3 for="register"><span>1.</span> Sign Up</h3>
                <p class="desc">
                  Create an account to access the downloads. Don't worry its
                  100% free - no credit card required.
                </p>
              </div>
            </div>
            <div class="column verify">
              <div class="">
                <i class="fad fa-user-check fa-4x"></i>
                <br />
                <h3 for="verify"><span>2.</span> Verify Account</h3>
                <p class="desc">
                  Check your email. We've sent you a message with a link to
                  verify your account. No <i class="fad fa-robot"></i> 's
                  allowed around here.
                </p>
              </div>
            </div>
            <div class="column download">
              <div class>
                <i class="fad fa-download fa-4x"></i>
                <br />
                <h3 for="download"><span>3.</span> Download Files</h3>
                <p class="desc">
                  That's it! Once your account is activated, feel free to browse
                  through the cinematics and start downloading!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-12 has-text-centered">
          <br /><br /><br />
          <router-link
            to="/register"
            class="button is-large is-primary cta-btn"
          >
            Create an Account
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'How',
  props: {}
}
</script>

<style lang="scss" scoped>
.cta-btn {
  box-shadow: $light-600 0px 10px 40px -10px;
}
section {
  background: $light-400;
  color: $light-900;
  text-align: left;
  height: auto;
  padding: 150px;
}

.container {
  padding-top: 4rem;
  padding-bottom: 4rem;
}
.columns.is-vcentered {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.title-group {
  text-align: left;
  .title {
    color: $light-800;
    padding-bottom: 30px;
    font-family: quiroh, sans-serif;
  }
}
.columns {
  padding-top: 35px;
}

svg {
  padding-top: 10px;
  padding-bottom: 10px;
}

h3 {
  font-size: 1.8rem;
  padding-top: 15px;
  padding-bottom: 15px;
  font-weight: 600;
  color: $light-800;
}
.desc {
  padding-right: 50px;
  letter-spacing: 0.02rem;
  font-family: nunito-sans, sans-serif;
}
</style>
