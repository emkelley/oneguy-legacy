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
import crypto from 'crypto'
export default {
  data() {
    return {
      path: '/app/card-fallback.jpg',
      finalUrl: undefined,
    }
  },
  methods: {
    createToken() {
      const path = this.path
      const securityKey = process.env.VUE_APP_BCDN_TOKEN
      const expires = Math.round(Date.now() / 1000) + 3600
      const hashableBase = securityKey + path + expires
      const md5String = crypto
        .createHash('md5')
        .update(hashableBase)
        .digest('binary')
      let token = new Buffer(md5String, 'binary').toString('base64')
      token = token
        .replace('\n', '')
        .replace('+', '-')
        .replace('/', '_')
        .replace('=', '')

      // Build the URL
      this.finalUrl =
        'https://v.cdn.oneguy.io' +
        path +
        '?token=' +
        token +
        '&expires=' +
        expires
    },
  },
}
</script>

<style lang="scss" scoped>
.create-token {
  margin-bottom: 15rem;
  padding-left: 5rem;
}
</style>
