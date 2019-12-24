<template>
  <main>
    <section v-if="!mapData" class="game-content">
      <section class="hero is-medium is-light"></section>
      <section class="body">
        <div class="container"><br /><br /><br /></div>
      </section>
    </section>
    <section v-if="mapData" class="game-content">
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
        <div class="container">
          <br /><br />
          <div class="columns">
            <div class="column is-6"></div>
            <div class="column is-6">
              <label for="">Map Name:</label>
              <h1 class="title">{{ mapData.mapName }}</h1>
              <label for="">Map Description:</label>
              <h1 class="title">{{ wikiData }}</h1>
              <label for="">Total Cinematics:</label>
              <h1 class="title">{{ cinematics.length }}</h1>
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
                  <p class="subtitle is-5">
                    <strong>Resolution:</strong> 1440p
                  </p>
                </template>
                <template v-slot:foot-right>
                  <a
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
      </section>
    </section>
  </main>
</template>
<script>
import { db } from '@/main'
import MapSelect from '@/components/MapSelect.vue'
import _ from 'lodash'
import axios from 'axios'
export default {
  components: {
    MapSelect
  },
  data() {
    return {
      loading: false,
      mapData: undefined,
      cinematics: [],
      isFullPage: false,
      errorCode: undefined,
      status: '',
      wikiData: undefined
    }
  },
  mounted() {
    this.fetchMapData()
  },
  methods: {
    fetchMapData() {
      let map = this.$router.currentRoute.params.mapId
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
      let cinematicsArray = []
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          cinematicsArray.push(doc.data())
        })
        this.cinematics = _.clone(cinematicsArray)
        this.fetchWikiData()
      })
    },
    fetchWikiData() {
      let url = 'https://overwatch.fandom.com/api/v1/Articles/AsSimpleJson?id='
      let id = this.mapData.wiki.toString()
      let builtUrl = url + id

      axios.get(builtUrl).then(response => (this.wikiData = response))
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  height: 80vh;
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
</style>
