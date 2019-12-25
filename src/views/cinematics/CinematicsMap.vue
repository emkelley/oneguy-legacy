<template>
  <main>
    <section v-if="loading" class="game-content">
      <section class="hero is-fullheight is-light">
        <div class="hero-body">
          <div class="container has-text-centered">
            <i class="fal fa-spinner-third fa-spin fa-2x"></i><br /><br />
            <h1 class="title">Fetching Cinematics Data...</h1>
          </div>
        </div>
      </section>
      <section class="body">
        <div class="container"><br /><br /><br /></div>
      </section>
    </section>
    <section v-if="!loading" class="game-content">
      <section
        class="hero is-medium "
        :style="{ 'background-image': 'url(' + mapData.poster + ')' }"
      >
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">{{ mapData.mapName }} Cinematics</h1>
            <h2 class="subtitle">
              Browse below for available {{ mapData.mapName }} Cinematics
            </h2>
          </div>
        </div>
      </section>
      <section class="body">
        <div class="container map-container">
          <br /><br />
          <div class="columns">
            <div class="column is-6">
              <iframe
                v-if="yt != undefined"
                id="ytplayer"
                type="text/html"
                width="640"
                height="360px"
                :src="yt"
                frameborder="0"
              ></iframe>
            </div>
            <div class="column is-6">
              <nav class="level">
                <div class="level-left">
                  <div class="level-item">
                    <div>
                      <p class="heading">Map Name</p>
                      <p class="title">{{ mapData.mapName }}</p>
                    </div>
                  </div>
                  <div class="level-item" style="margin-left: 2rem;">
                    <div>
                      <p class="heading">Game</p>
                      <p class="title">{{ game }}</p>
                    </div>
                  </div>
                </div>
              </nav>
              <label for="">Map Description:</label>
              <p style="margin-top: 5px">{{ mapData.description }}</p>
              <br />

              <nav class="level">
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Total Cinematics</p>
                    <p class="title">{{ cinematics.length }}</p>
                  </div>
                </div>
                <div
                  v-if="mapData.addedToDb"
                  class="level-item has-text-centered"
                >
                  <div>
                    <p class="heading">Added to Database</p>
                    <p class="title">
                      {{ mapData.addedToDb | moment('MMM D, YYYY') }}
                    </p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">All Time Downloads</p>
                    <p class="title">8,239</p>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <br /><br /><br />
          <h1 class="title">Available Cinematics</h1>
          <hr />
          <div class="columns is-multiline">
            <article
              v-for="cinematic in cinematics"
              :key="cinematic._id"
              class="column is-4"
            >
              <MapSelect :url="cinematic.thumbnail">
                <template v-slot:header>
                  <strong
                    >{{ mapData.mapName }} - #{{ cinematic.number }}</strong
                  >
                </template>
                <template v-slot:foot-left>
                  <p v-if="!isAuthed">
                    Log in to download cinematics.
                  </p>
                  <p v-if="isAuthed" class="subtitle is-5">
                    <strong>Resolution:</strong> 1440p
                  </p>
                </template>
                <template v-slot:foot-right>
                  <a
                    v-if="isAuthed"
                    :href="cinematic.downloadUrl"
                    class="button is-primary is-outlined"
                    download
                    target="_blank"
                    >Download Cinematic</a
                  >
                </template>
              </MapSelect>
            </article>
          </div>
        </div>
        <FeaturedMini v-if="featured" :featured="featured" />
      </section>
    </section>
  </main>
</template>
<script>
import { db } from '@/main'
import MapSelect from '@/components/MapSelect.vue'
import FeaturedMini from '@/components/FeaturedMini.vue'
import _ from 'lodash'
import { mapGetters } from 'vuex'
export default {
  components: {
    MapSelect,
    FeaturedMini
  },
  data() {
    return {
      loading: true,
      mapData: undefined,
      cinematics: [],
      isFullPage: false,
      errorCode: undefined,
      status: '',
      wikiData: undefined,
      featured: undefined
    }
  },
  computed: {
    yt: function() {
      if (this.mapData) {
        let url =
          'https://www.youtube.com/embed/' +
          this.mapData.yt +
          '?autoplay=0&mute=1&origin=https://oneguy.io'
        return url
      } else {
        return undefined
      }
    },
    game() {
      return _.startCase(this.$router.currentRoute.params.gameId)
    },
    ...mapGetters(['isAuthed'])
  },
  mounted() {
    this.fetchMapData()
  },
  methods: {
    fetchMapData() {
      let routerMap = this.$router.currentRoute.params.mapId
      let map
      // Guard for previous url pattern
      if (map === 'ow') {
        map = 'overwatch'
      } else {
        map = routerMap
      }

      let mapRef = db.collection('maps').doc(map)
      mapRef
        .get()
        .then(doc => {
          if (!doc.exists) {
            this.$router.replace('/error/404')
          } else {
            this.mapData = doc.data()
            this.fetchMapCinematics()
          }
        })
        .catch(err => {
          this.errorCode = err.code
        })
    },
    fetchMapCinematics() {
      let map = this.$router.currentRoute.params.mapId
      let ref = db
        .collection('maps')
        .doc(map)
        .collection('cinematics')
        .orderBy('number', 'asc')
      let cinematicsArray = []
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          cinematicsArray.push(doc.data())
        })
        this.cinematics = _.clone(cinematicsArray)
        setTimeout(() => {
          this.loading = false
          this.fetchFeaturedCinematics()
        }, 100)
      })
    },
    fetchFeaturedCinematics() {
      let ref = db.collection('featured')
      let gamesArray = []
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          gamesArray.push(doc.data())
        })
        if (gamesArray.length > 0) {
          this.featured = _.clone(gamesArray)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  background: $light-300;
}
.game-content {
  .hero {
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    padding-top: 52px;
    .hero-body {
      background: rgba($color: $light-200, $alpha: 0.5);
      backdrop-filter: blur(5px) saturate(200%);
      box-shadow: $shadow-small;
    }
  }
}
hr {
  background-color: $primary !important;
}
.empty {
  padding-top: 52px;
}
label {
  font-weight: bold;
}
iframe {
  height: 360px !important;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid $primary;
}
.map-container {
  padding-bottom: 15rem;
}
</style>
