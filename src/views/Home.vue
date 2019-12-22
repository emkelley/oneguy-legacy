<template>
  <main>
    <HeroHome />
    <section class="container og-section intro">
      <div class="columns">
        <div class="column is-6 has-text-centered va">
          <p>
            <i class="fad fa-camera-movie fa-3x" style="color: #19254f"></i
            ><span class="spacer"></span>
            <i class="fad fa-camera fa-3x" style="color: #19254f"></i>
            <br />
            <br />
          </p>
          <h1 class="title has-text-centered">
            100% Royalty-Free Video Game <br />
            <span>Cinematics</span> and <span>Photography</span> <br />
            <br />
            <button class="button is-primary is-large cta-btn">
              Create an Account
            </button>
          </h1>
        </div>
        <div class="column is-6">
          <p class="body">
            From what was once just an idea to help fellow content creators,
            these cinematic packs have evolved into something much larger than
            ever imaginable. After analyzing the numbers behind the 29 (and
            counting) Overwatch Cinematics, I decided to create this site to
            allow an even wider audience to gain access to quality cinematics.
            Not everyone has time to record cinematics or the patience to track
            them down all around the web - that's where this site comes in.
          </p>
        </div>
      </div>
    </section>
    <section class="latest">
      <div class="container og-section ">
        <h1 class="title is-2">
          <i class="fad fa-film"></i>&ensp;Featured Cinematic Packs
        </h1>
        <br /><br />
        <div class="columns is-multiline">
          <article
            v-for="cinematic in featured"
            :key="cinematic.id"
            class="column is-4"
          >
            <MapSelect :url="cinematic.thumbnail">
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
        </div>
      </div>
    </section>
    <HowTo />
  </main>
</template>

<script>
import { db } from '@/main'
import _ from 'lodash'
import HeroHome from '@/components/HeroHome.vue'
import HowTo from '@/components/HowTo.vue'
import MapSelect from '@/components/MapSelect.vue'
export default {
  components: {
    HowTo,
    HeroHome,
    MapSelect
  },
  data() {
    return {
      title: 'Home',
      featured: []
    }
  },
  mounted() {
    this.fetchFeaturedCinematics()
  },
  methods: {
    fetchFeaturedCinematics() {
      this.loading = true
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
main {
  background: $light-300;
  margin-top: -50px;
}
.test {
  float: right !important;
}
.hero-body {
  background: rgba($color: #fff, $alpha: 0.4);
  backdrop-filter: saturate(200%);
}
.intro {
  .title {
    font-family: quiroh, sans-serif;
  }
  .body {
    font-size: 1.25rem;
  }
}
.latest {
  background: $light-900;
  .title {
    font-family: quiroh, sans-serif;
    color: #fff;
  }
}
span {
  &.spacer {
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>
