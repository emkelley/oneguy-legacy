<template>
  <main>
    <section class="hero is-medium ">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Available Cinematics
          </h1>
          <h2 class="subtitle">
            Select a game below to browse cinematics
          </h2>
        </div>
      </div>
    </section>
    <section class="body">
      <div class="container">
        <br /><br /><br />

        <div class="columns is-multiline games">
          <br /><br /><br /><br />
          <b-loading
            :is-full-page="false"
            :active.sync="loading"
            :can-cancel="false"
          ></b-loading>
          <br />
          <GameSelect
            v-for="game in currentGames"
            :key="game.id"
            :cover="game.cover"
          >
            <template v-slot:title> View</template>
          </GameSelect>

          <div v-if="currentGames.length > 0" class="column">
            <div class="wrapper coming-soon va has-text-centered">
              <h2 class="subtitle">More Coming Soon</h2>
              <p>
                Request another game here: <br />
                <router-link to="/account/request"
                  >Cinematic Request Form</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { db } from '@/main'
import GameSelect from '@/components/GameSelect.vue'
import _ from 'lodash'
export default {
  components: {
    GameSelect
  },
  data() {
    return {
      loading: false,
      currentGames: [],
      isFullPage: false
    }
  },
  mounted() {
    this.fetchGamesList()
  },
  methods: {
    fetchGamesList() {
      this.loading = true
      let ref = db.collection('games')
      let gamesArray = []
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          gamesArray.push(doc.data())
        })
        if (gamesArray.length > 0) {
          this.loading = false
          this.currentGames = _.clone(gamesArray)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  height: 80vh;
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
  }
}
.games {
  .column {
    padding: 1rem;

    .coming-soon {
      border-radius: 10px;
      min-height: 200px;
      padding: 1.5rem;
      border: 1px dashed rgba($color: $primary, $alpha: 0.5);
    }
  }
}
</style>
