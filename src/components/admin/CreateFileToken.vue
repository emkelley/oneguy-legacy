<template>
  <div class="columns create-token">
    <div class="column">
      <h1 class="title">Create CDN File Tokens</h1>
      <hr />
      <br />
      <div class="field">
        <label class="label">CDN File Path</label>
        <div class="control">
          <input
            v-model="path"
            class="input"
            type="text"
            placeholder="/cinematics/watchpoint-gibraltar/2.mp4"
          />
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button @click="createToken" class="button is-link">Create</button>
        </div>
      </div>
      <br /><br />
      {{ finalUrl }}
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  data() {
    return {
      path: '/app/card-fallback.jpg',
      finalUrl: undefined
    }
  },
  methods: {
    createToken() {
      let path = this.path
      let securityKey = process.env.VUE_APP_BCDN_TOKEN
      // Set the time of expiry to one hour from now
      let expires = Math.round(Date.now() / 1000) + 3600
      let hashableBase = securityKey + path + expires
      // Generate and encode the token
      let token = CryptoJS.MD5(hashableBase).toString(CryptoJS.enc.Base64)
      token = token
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/\=/g, '') //eslint-disable-line
      // Generate the URL
      this.finalUrl =
        'https://v.cdn.oneguy.io' +
        path +
        '?token=' +
        token +
        '&expires=' +
        expires
    }
  }
}
</script>

<style lang="scss" scoped>
.create-token {
  margin-bottom: 15rem;
  padding-left: 5rem;
}
</style>
