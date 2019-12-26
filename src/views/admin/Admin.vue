<template>
  <div id="admin">
    <vue-headful title="Admin - OneGuy Cinematics" />
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Admin Panel
          </h1>
        </div>
      </div>
    </section>
    <section class="wrapper">
      <div class="container">
        <div class="columns">
          <div class="column is-2">
            <aside class="menu">
              <p class="menu-label">
                App
              </p>
              <ul class="menu-list">
                <li>
                  <a
                    id="general"
                    class="list-link"
                    @click="setActiveTab('general')"
                    >General</a
                  >
                </li>
                <li>
                  <a id="token" class="list-link" @click="setActiveTab('token')"
                    >Generate CDN Tokens</a
                  >
                </li>
              </ul>
              <br />
              <p class="menu-label">
                New Content
              </p>
              <ul class="menu-list">
                <li>
                  <a
                    id="addGame"
                    class="list-link"
                    @click="setActiveTab('addGame')"
                    >Add New Game</a
                  >
                </li>
                <li>
                  <a
                    id="addMap"
                    class="list-link"
                    @click="setActiveTab('addMap')"
                    >Add New Map</a
                  >
                </li>
                <li>
                  <a
                    id="addCinematic"
                    class="list-link is-active"
                    @click="setActiveTab('addCinematic')"
                    >Add New Cinematic</a
                  >
                </li>
              </ul>
              <br />
              <p class="menu-label">
                Manage
              </p>
              <ul class="menu-list">
                <li>
                  <a
                    id="manageGames"
                    class="list-link"
                    @click="setActiveTab('manageGames')"
                    >Games</a
                  >
                </li>
                <li>
                  <a
                    id="manageCinematics"
                    class="list-link"
                    @click="setActiveTab('manageCinematics')"
                    >Cinematics</a
                  >
                </li>
                <li>
                  <a
                    id="manageUsers"
                    class="list-link"
                    @click="setActiveTab('manageUsers')"
                    >Users</a
                  >
                </li>
              </ul>
            </aside>
          </div>
          <AddMap v-if="activeTab == 'addMap'" />
          <AddCinematic v-if="activeTab == 'addCinematic'" />
          <CreateFileToken v-if="activeTab == 'token'" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AddMap from '@/components/admin/AddMap.vue'
import AddCinematic from '@/components/admin/AddCinematic.vue'
import CreateFileToken from '@/components/admin/CreateFileToken.vue'
import { db } from '@/main'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeTab: 'addCinematic'
    }
  },
  components: {
    AddMap,
    AddCinematic,
    CreateFileToken
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  created() {
    if (!this.userProfile.isAdmin) {
      console.log('not admin')
      this.$router.push({ name: '403' })
    }
  },
  methods: {
    uploadData() {
      const array = this.latest
      array.forEach(doc => {
        let game = {
          id: doc.id,
          name: doc.name,
          game: doc.game,
          thumbnail: doc.thumbnail,
          count: doc.count,
          url: doc.url
        }
        setTimeout(() => {
          db.collection('featured').add(game)
        }, 200)
      })
    },
    setActiveTab(value) {
      let curActive = document.getElementById(this.activeTab)
      let newActive = document.getElementById(value)
      curActive.classList.remove('is-active')
      newActive.classList.add('is-active')
      this.activeTab = value
    }
  }
}
</script>

<style lang="scss" scoped>
#admin {
  padding-top: 52px;
  background-color: $light-300;
}
.wrapper {
  min-height: 80vh;
  padding-top: 4rem;
}
</style>
