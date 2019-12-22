<template>
  <footer class="va has-text-centered">
    <p class="">
      OG Cinematics is made with
      <i class="fal fa-heart"></i> and <i class="fal fa-mug-hot"></i> by
      <a href="https://twitter.com/llOneGuyll" target="_blank">OneGuy</a>
    </p>
    <a href="https://emk.dev" target="_blank" class="help"
      >ERICMKELLEY - {{ year }}</a
    >
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
  height: 100px;
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
