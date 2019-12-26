<template>
  <section class="column add-map">
    <h1 class="title"><i class="fad fa-folder-plus"></i>&emsp; Add New Map</h1>
    <hr class="title-hr" />
    <br />
    <div class="columns">
      <div class="column is-12">
        <div class="form-wrapper">
          <!-- <form
            method="POST"
            v-on:submit.prevent="uploadToCdn"
            @keydown.enter="uploadToCdn"
          > -->
          <br />
          <h2 class="subtitle">General Information</h2>
          <hr />
          <br />
          <b-field grouped>
            <b-field label=" Parent Game" expanded>
              <b-field>
                <b-input
                  v-model="mapInfo.game"
                  placeholder="Overwatch"
                  expanded
                ></b-input>
              </b-field>
            </b-field>
            <b-field label="Full Map Name" expanded>
              <b-field>
                <b-input
                  v-model="mapInfo.mapName"
                  placeholder="Volskaya Industries"
                  expanded
                ></b-input>
              </b-field>
            </b-field>
            <b-field label="Wiki Link" expanded>
              <b-field>
                <b-input
                  v-model="mapInfo.wiki"
                  placeholder="https://overwatch.gamepedia.com/Petra"
                  expanded
                ></b-input>
              </b-field>
            </b-field>
            <b-field label="Youtube Video ID" expanded>
              <b-input v-model="mapInfo.yt" placeholder="sW-N8Vb_DFI"></b-input>
            </b-field>
          </b-field>
          <b-field grouped>
            <b-field label="OG Cinematics URL" expanded>
              <b-field>
                <b-input
                  v-model="mapUrl"
                  disabled
                  placeholder=""
                  expanded
                ></b-input>
              </b-field>
            </b-field>
            <b-field label="Map URL Slug" expanded>
              <b-input v-model="kebabName" disabled placeholder=""></b-input>
            </b-field>
          </b-field>
          <b-field grouped>
            <b-field label="Map Description" expanded>
              <b-input
                v-model="mapInfo.description"
                type="textarea"
                height="175px;"
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              ></b-input>
            </b-field> </b-field
          ><br />
          <b-checkbox v-model="customAddedDate">
            Use a custom 'Added to Database' date
          </b-checkbox>
          <br />
          <br />
          <b-field grouped>
            <br /><br />
            <b-field v-if="customAddedDate" grouped>
              <b-field label="Month" expanded>
                <b-input v-model="customMonth" placeholder="XX"></b-input>
              </b-field>
              <b-field label="Day" expanded>
                <b-input v-model="customDay" placeholder="XX"></b-input>
              </b-field>
              <b-field label="Year" expanded>
                <b-input v-model="customYear" placeholder="XXXX"></b-input>
              </b-field>
            </b-field>
          </b-field>
          <br />
          <br />
          <h2 class="subtitle">Add Media</h2>
          <hr />
          <div class="columns">
            <div class="column is-4">
              <p style="font-weight: bold">
                Upload Map Poster Image:
              </p>
              <br />
              <div class="upload-btn va">
                <b-field class="file">
                  <b-upload v-model="file">
                    <a class="button is-primary">
                      <b-icon icon="upload"></b-icon>
                      <span>Click to upload</span>
                    </a>
                  </b-upload>
                  <span class="file-name" v-if="file">
                    {{ file.name }}
                  </span>
                </b-field>
              </div>
            </div>
            <div class="column has-text-centered">
              <p style="font-weight: bold">
                Preview:
              </p>
              <div id="preview">
                <img width="100%" v-if="previewUrl" :src="previewUrl" />
              </div>
            </div>
          </div>
          <br />
          <br />
          <h3 class="heading">Finish</h3>
          <hr />
          <br />
          <div class="field has-text-centered">
            <b-checkbox v-model="checkbox">
              I have looked over all fields and understand I must activate the
              map before it can be viewed publicly.
            </b-checkbox>
            <br />
            <br />
            <button
              :disabled="!checkbox"
              @click="uploadToCdn"
              class="button is-medium is-primary"
            >
              Add New Map
            </button>
          </div>
          <!-- </form> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { db } from '@/main'
import uuidv4 from 'uuid/v4'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
export default {
  data() {
    return {
      loading: false,
      checkbox: false,
      file: undefined,
      mapInfo: {
        id: undefined,
        active: true,
        game: 'Overwatch',
        mapName: 'Watchpoint Gibraltar',
        slug: undefined,
        url: undefined,
        wiki: 'https://overwatch.gamepedia.com/Watchpoint:_Gibraltar',
        yt: 'c2lSiIR1Wjc',
        description:
          'At its height, Overwatch maintained a number of bases around the world, each with its own purpose: peacekeeping, scientific research, or in the case of Watchpoint: Gibraltar, providing an orbital launch facility. The base was mothballed along with the rest of Overwatch installations, but there have been recent reports of activity within the perimeter. Could this indicate the presence of former Overwatch agents, or is this the work of organizations with more nefarious intentions?',
        poster: undefined,
        addedToDb: undefined
      },
      customAddedDate: false,
      customDay: undefined,
      customMonth: undefined,
      customYear: undefined
    }
  },
  computed: {
    previewUrl() {
      let url
      if (this.file) {
        url = URL.createObjectURL(this.file)
      } else {
        url = undefined
      }
      return url
    },
    mapUrl: function() {
      return (
        '/cinematics/' + _.toLower(this.mapInfo.game) + '/' + this.kebabName
      )
    },
    kebabName: function() {
      return this.convertToKebabCase(this.mapInfo.mapName)
    }
  },
  methods: {
    uploadToCdn() {
      this.loading = true
      let file = this.file
      let map = this.kebabName
      let url = `https://storage.bunnycdn.com/oneguy/app/posters/${map}.png`
      let config = {
        headers: {
          AccessKey: process.env.VUE_APP_BCDN_API_KEY
        }
      }
      if (!file) {
        return
      } else {
        axios.put(url, file, config).then(
          response => {
            if (response.status == 201) {
              let finalUrl = `https://cdn.oneguy.io/app/posters/${map}.png`
              this.finalPropertiesPrep(finalUrl)
            }
          },
          error => {
            alert(error.message)
          }
        )
      }
    },
    finalPropertiesPrep(url) {
      this.mapInfo.url = this.mapUrl
      this.mapInfo.poster = url
      this.mapInfo.slug = this.kebabName
      this.mapInfo.id = uuidv4()
      let day = this.customDay
      let month = this.customMonth
      let year = this.customYear
      if (this.customAddedDate) {
        this.mapInfo.addedToDb = moment(
          `${month}/${day}/${year}`,
          'MM/DD/YYYY'
        ).unix()
      } else {
        this.mapInfo.addedToDb = moment().unix()
      }
      this.finalUpload()
    },
    finalUpload() {
      let finalMapInfo = this.mapInfo
      db.collection('maps')
        .doc(finalMapInfo.slug)
        .set(finalMapInfo, { merge: true })
    },
    convertToKebabCase(string) {
      return string
        .replace(/[^\w\s]|_/g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s+/g, '-')
        .toLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
.fad {
  color: $primary;
}
.add-map {
  margin-bottom: 15rem;
  padding-left: 5rem;
}
.title {
  font-size: 1.4rem;
  margin-bottom: 5px;
}
.subtitle {
  margin-bottom: 12px;
}
h3.heading {
  color: $primary;
  font-weight: bold;
}
hr {
  margin-top: 12px !important;
  margin-bottom: 12px !important;
  background-color: $primary;
}
#preview {
  padding: 1rem;
  img {
    border-radius: 10px;
    box-shadow: $shadow-medium;
    overflow: hidden;
  }
}
</style>
