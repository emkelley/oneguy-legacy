<template>
  <main>
    <section class="hero is-medium ">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">{{ currentGame }} Cinematics</h1>
          <h2 class="subtitle">
            Select a map below to browse individual cinematics
          </h2>
        </div>
      </div>
    </section>
    <section class="body">
      <div class="container">
        <br /><br /><br />

        <div class="columns is-multiline">
          <article
            v-for="cinematic in currentMaps"
            :key="cinematic.id"
            class="column is-4"
          >
            <MapSelect :url="cinematic.poster">
              <template v-slot:header>
                <strong>{{ cinematic.name }}</strong> - {{ cinematic.game }}
              </template>
              <template v-slot:foot-left>
                <p class="subtitle is-5">
                  <strong>{{ cinematic.count }}</strong> Cinematics
                </p>
              </template>
              <template v-slot:foot-right>
                <router-link
                  :to="cinematic.url"
                  class="button is-primary is-outlined"
                  >View Cinematics</router-link
                >
              </template>
            </MapSelect>
          </article>
          <article
            v-if="currentMaps.length > 0"
            class="column va has-text-centered"
          >
            <div class="wrapper coming-soon ">
              <h2 class="subtitle">More Coming Soon</h2>
              <p>
                Request another map here: <br />
                <router-link to="/account/request"
                  >Cinematic Request Form</router-link
                >
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { db } from '@/main'
import MapSelect from '@/components/MapSelect.vue'
import _ from 'lodash'
export default {
  components: {
    MapSelect
  },
  data() {
    return {
      loading: false,
      currentMaps: [],
      isFullPage: false
    }
  },
  computed: {
    currentGame() {
      return _.startCase(this.$router.currentRoute.params.gameId)
    }
  },
  mounted() {
    this.fetchMapsList()
  },
  methods: {
    fetchMapsList() {
      this.loading = true
      let ref = db.collection('maps').where('game', '==', this.currentGame)
      let mapsArray = []
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          mapsArray.push(doc.data())
        })
        if (mapsArray.length > 0) {
          this.loading = false
          this.currentMaps = _.clone(mapsArray)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  height: 80vh;
  background: $light-300;
}
.hero {
  background: url('../../assets/img/hero/hero-chateau.jpg');
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding-top: 52px;
  .hero-body {
    background: rgba($color: $light-200, $alpha: 0.4);
    backdrop-filter: blur(10px) saturate(200%);
    box-shadow: $shadow-small;
  }
}
.coming-soon {
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px dashed rgba($color: $primary, $alpha: 0.5);
}
</style>
