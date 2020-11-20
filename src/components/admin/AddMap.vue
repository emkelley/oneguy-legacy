<template>
  <section class="column add-map">
    <h1 class="title"><i class="fad fa-map"></i>&emsp; Add New Map</h1>
    <hr class="title-hr" />
    <br />
    <div class="columns">
      <div class="column is-12">
        <div class="form-wrapper og-card">
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
                height="250px"
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
              @click="uploadToCdn()"
              class="button is-medium is-primary"
            >
              Add New Map</button
            ><br />
            <h1 v-if="mapAdded" class="title">Map Successfully Added!</h1>
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
        mapName: 'Echopoint: Antarctica',
        slug: undefined,
        url: undefined,
        wiki: 'https://overwatch.gamepedia.com/Echopoint:_Antarctica',
        yt: 'NZvfSDG07kg',
        description:
          'Maintained by Overwatch, the ecopoint served as a monitoring station for the study of Earths changing climate. Disaster struck the station when it was hit by a polar storm, damaging the stations solar array. Cut off from the outside world, the scientists were left stranded in the damaged facility. As their supplies dwindled, they entered cryostasis in a last-ditch effort to survive until a rescue attempt could be made. Rescue came years later, but Dr. Mei-Ling Zhou was the only survivor. By this point, Overwatch was no more, and the eco-watchpoints had ceased to operate. Mei left the base after receiving a recall order from Winston.',
        poster: undefined,
        addedToDb: undefined
      },
      customAddedDate: false,
      customDay: undefined,
      customMonth: undefined,
      customYear: undefined,
      mapAdded: false
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
      this.mapAdded = false
      if (this.file == undefined) {
        let finalUrl = `https://cdn.oneguy.io/app/games/${_.toLower(
          this.mapInfo.game
        )}/posters/${this.kebabName}.jpg`
        this.finalPropertiesPrep(finalUrl)
      } else {
        this.loading = true
        let file = this.file
        let map = this.kebabName
        let url = `https://storage.bunnycdn.com/oneguy/app/games/${_.toLower(
          this.mapInfo.game
        )}/posters/${map}.jpg`
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
                let finalUrl = `https://cdn.oneguy.io/app/games/${_.toLower(
                  this.mapInfo.game
                )}/posters/${map}.jpg`
                this.finalPropertiesPrep(finalUrl)
              }
            },
            error => {
              alert(error.message)
            }
          )
        }
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
        .set(finalMapInfo)
        .then(() => {
          this.$buefy.toast.open({
            message: 'Map Added Successfully!',
            type: 'is-success'
          })
          window.scrollTo(0, 0)
        })
        .catch(err => {
          this.$buefy.toast.open({
            message: `Error adding map: ${err.message}`,
            type: 'is-danger'
          })
        })
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
    height: 370px;
  }
}
textarea {
  min-height: 250px !important;
}
.og-card {
  background-color: white;
  margin-bottom: 2rem;
  border-radius: 6px;
  padding: 1.5rem;
  box-shadow: $shadow-large;
  .og-card-content {
    margin-bottom: 5rem;
    .empty {
      height: 300px;
    }
  }
  .subtitle {
    font-weight: bold;
  }
  img {
    max-height: 200px;
  }
}
</style>
