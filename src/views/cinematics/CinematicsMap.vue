<template>
  <main>
    <vue-headful
      v-if="mapData"
      :title="mapData.mapName + ' - OneGuy Cinematics'"
    />
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
            <center>
              <div
                v-if="heroTitleLength"
                class="title-card va"
                :style="{ width: heroTitleLength + 'px' }"
              >
                <h2 class="subtitle">{{ mapData.game }}</h2>
                <center><hr /></center>
                <h1 class="title">{{ mapData.mapName }}</h1>
              </div>
            </center>
          </div>
        </div>
      </section>
      <section class="body">
        <div class="map-container">
          <br /><br />
          <div class="container map-info">
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
                        <p class="title">{{ this.mapData.game }}</p>
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
                      <p class="heading">Wiki Link</p>
                      <a
                        :href="mapData.wiki"
                        target="_blank"
                        class="button is-info"
                        >View Wiki</a
                      >
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <br /><br /><br />
          <section class="cinematics">
            <div class="container">
              <h1 class="title has-text-centered">Available Cinematics</h1>
              <hr />
              <br />
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
                      <p class="card-footer-text" v-if="!isAuthed">
                        Log in to download cinematics.
                      </p>
                      <p v-if="isAuthed" class="card-footer-text subtitle is-5">
                        <strong>Resolution:</strong> 1440p
                      </p>
                    </template>
                    <template v-slot:foot-right>
                      <a
                        v-if="isAuthed"
                        @click="getDownloadLink(cinematic.filePath)"
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
          </section>
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
import CryptoJS from 'crypto-js'
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
          'https://www.youtube-nocookie.com/embed/' +
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
    heroTitleLength() {
      return this.mapData.mapName.length * 35
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
    },
    getDownloadLink(path) {
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
      let URL =
        'https://v.cdn.oneguy.io' +
        path +
        '?token=' +
        token +
        '&expires=' +
        expires
      window.open(URL, '_blank')
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
    backdrop-filter: saturate(200%) !important;
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    padding-top: 52px;
    .hero-body {
      backdrop-filter: blur(0px) saturate(110%);
      box-shadow: $shadow-small;
      font-family: quiroh, sans-serif;
      .title {
        font-size: 2.5rem;
      }
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
.cinematics {
  padding-top: 5rem;
  padding-bottom: 15rem;
  background-color: $light-500;
}
.map-info {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.title-card {
  height: 150px;
  min-width: 200px;
  background: rgba($color: black, $alpha: 0.5);
  backdrop-filter: blur(5px) saturate(200%);
  border-radius: 5px;
  box-shadow: $shadow-small;
  hr {
    width: 50%;
    background: white !important;
    margin: 10px;
  }
  .title {
    color: white;
    font-family: 'BigNoodleToo', sans-serif;
    letter-spacing: 0.1rem;
    font-size: 4rem !important;
    font-weight: 300;
  }
  .subtitle {
    color: white;
    margin-bottom: 0px;
    font-family: quiroh, sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.05rem;
    text-shadow: $text-shadow;
  }
}
// .card-footer-text {
//   strong {
//     color: white !important;
//   }
//   color: white !important;
// }
</style>
