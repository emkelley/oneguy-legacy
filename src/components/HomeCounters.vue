<template>
  <section class="counters">
    <div class="container">
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Downloads Served</p>
            <p class="title">
              <ICountUp
                :delay="delay"
                :endVal="downloads"
                :options="options"
                @ready="totalReady"
              />
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Total Cinematics</p>
            <p class="title">
              <ICountUp
                :delay="delay"
                :endVal="totalCinematics"
                :options="options"
                @ready="cineReady"
              />
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Supported Maps</p>
            <p class="title">
              <ICountUp
                :delay="delay"
                :endVal="totalMaps"
                :options="options"
                @ready="mapReady"
              />
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Bandwidth Served</p>
            <p class="title">
              <ICountUp
                :delay="delay"
                :endVal="totalGames"
                :options="bandwidthOptions"
                @ready="gamesReady"
              />
            </p>
          </div>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import ICountUp from 'vue-countup-v2'
export default {
  components: {
    ICountUp,
  },
  data() {
    return {
      delay: 1000,
      downloads: 122500,
      totalMaps: 30,
      totalCinematics: 700,
      totalGames: 210,
      bandwidthOptions: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: 'TB',
      },
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        suffix: '+',
      },
    }
  },
  methods: {
    totalReady: function (instance) {
      instance.update(this.downloads)
    },
    mapReady: function (instance) {
      instance.update(this.totalMaps)
    },
    cineReady: function (instance) {
      instance.update(this.totalCinematics)
    },
    gamesReady: function (instance) {
      instance.update(this.totalGames)
    },
  },
}
</script>

<style lang="scss" scoped>
section {
  padding-top: 4rem;
  padding-bottom: 4rem;
  background-color: $light-500;
}
</style>
