<template>
  <footer class="va has-text-centered">
    <p class="">
      OneGuy Cinematics is made with
      <i class="fal fa-heart"></i> for the YouTube & Twitch Community
    </p>
    <br />
    <p>
      <a href="https://twitter.com/llOneGuyll" target="_blank" class="help"
        >@llOneGuyll</a
      >
      <a href="https://emk.dev" target="_blank" class="help"
        >ERICMKELLEY - {{ year }}</a
      >
    </p>
    <br />
  </footer>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    year() {
      let date = new Date()
      let year = date.getFullYear()
      var roman = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
      }
      var str = ''

      for (var i of Object.keys(roman)) {
        var q = Math.floor(year / roman[i])
        year -= q * roman[i]
        str += i.repeat(q)
      }

      return str
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  padding-top: 25px;
  background: $primary-dark;
  color: #dfdfdf;
  a {
    color: #8ca2ec;
  }
  strong {
    color: #dfdfdf;
  }
}
</style>
