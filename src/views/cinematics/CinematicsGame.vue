<template>
  <main>
    <vue-headful
      v-if="gameData"
      :title="gameData.name + ' - OneGuy Cinematics'"
    />
    <section v-if="!gameData" class="game-content">
      <section class="hero is-medium is-light"></section>
      <section class="body">
        <div class="container"><br /><br /><br /></div>
      </section>
    </section>
    <section v-if="gameData" class="game-content">
      <section
        class="hero is-medium "
        :style="{ 'background-image': 'url(' + gameData.hero + ')' }"
      >
        <div class="hero-body">
          <div class="container has-text-centered">
            <img
              v-if="gameData.logo"
              :src="gameData.logo"
              width="400px"
              :alt="gameData.name + ' Logo'"
            />
            <h1 v-else class="title">{{ gameData.name }} Cinematics</h1>
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
                <template v-slot:availability>
                  <span class="tag is-light">{{
                    cinematic.active ? 'Available' : 'Coming Soon'
                  }}</span>
                </template>
                <template v-slot:header>
                  <strong>{{ cinematic.mapName }}</strong>
                </template>
                <template v-if="cinematic.active" v-slot:foot-left>
                  <p class="subtitle is-5">
                    <strong>{{ cinematic.count || '0' }}</strong> Cinematics
                  </p>
                </template>
                <template v-slot:foot-right>
                  <router-link
                    v-if="cinematic.active"
                    :to="cinematic.url"
                    class="button is-primary is-outlined"
                    >View Cinematics</router-link
                  >
                  <a v-else disabled class="button is-primary is-outlined"
                    >Coming Soon</a
                  >
                </template>
              </MapSelect>
            </article>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>
<script>
import { db } from '@/main'
import MapSelect from '@/components/MapSelect.vue'
import _ from 'lodash'
import { nextTick } from 'q'
export default {
  components: {
    MapSelect
  },
  data() {
    return {
      loading: false,
      gameData: undefined,
      currentMaps: [],
      isFullPage: false,
      errorCode: undefined,
      status: ''
    }
  },
  mounted() {
    this.fetchGameData()
  },
  methods: {
    fetchGameData() {
      let game = this.$router.currentRoute.params.gameId
      let gameRef = db.collection('games').doc(game)
      gameRef
        .get()
        .then(doc => {
          if (!doc.exists) {
            this.$router.replace('/error/404')
          } else {
            this.gameData = doc.data()
            nextTick(() => {
              this.fetchMapsList()
            })
          }
        })
        .catch(err => {
          this.errorCode = err.code
        })
    },
    fetchMapsList() {
      this.loading = true
      let ref = db.collection('maps').where('game', '==', this.gameData.name)
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
  background: linear-gradient(127deg, $light-400 5%, $light-500 95%);
  padding-bottom: 20rem;

  @media only screen and (max-width: 70em) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
.game-content {
  .hero {
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    .hero-body {
      background: rgba($color: $light-200, $alpha: 0.5);
      backdrop-filter: blur(5px) saturate(200%);
      box-shadow: $shadow-small;
    }
  }
}
.empty {
  padding-top: 52px;
}
</style>
