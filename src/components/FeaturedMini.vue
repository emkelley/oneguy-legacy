<template>
  <section class="featured">
    <div class="container">
      <h1 class="title">
        <i class="fad fa-film-alt"></i>&emsp;&ensp;Related Cinematics
      </h1>
      <hr />
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
</template>

<script>
import MapSelect from '@/components/MapSelect.vue'
export default {
  props: {
    featured: {
      type: Array,
      required: true,
    },
  },
  components: {
    MapSelect,
  },
  data() {
    return {
      loading: false,
      gamesArray: [],
    }
  },
}
</script>

<style lang="scss" scoped>
.featured {
  background: linear-gradient(
    127deg,
    $primary-dark 0%,
    $primary 50%,
    $primary 100%
  );
  padding-top: 3rem;
  padding-bottom: 5rem;
  .title {
    color: white;
  }
  @media only screen and (max-width: 70em) {
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: center;
  }
}
.fad {
  transform: translateX(4%);
}
</style>
