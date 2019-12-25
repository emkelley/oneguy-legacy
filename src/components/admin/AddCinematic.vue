<template>
  <section class="column add-map">
    <h1 class="title">Add New Cinematic</h1>
    <hr />
    <br />
    <div class="columns">
      <div class="column is-12">
        <div class="form-wrapper">
          <h3 class="heading">Step 1: Add Cinematics to Queue</h3>
          <hr />
          <br />
          <b-field grouped>
            <b-field label="Parent Game" expanded>
              <b-field>
                <b-input
                  v-model="gameName"
                  placeholder="Overwatch"
                  expanded
                ></b-input>
              </b-field>
            </b-field>
            <b-field label="Map Name" expanded>
              <b-field>
                <b-input
                  v-model="mapName"
                  placeholder="Watchpoint-Gibraltar"
                  expanded
                ></b-input>
              </b-field>
            </b-field>
            <b-field label="Set Cinematic Count" expanded>
              <b-field>
                <b-input v-model="counter" expanded></b-input>
              </b-field>
            </b-field>
          </b-field>
          <br />
          <b-field grouped>
            <b-field label="Download Link" expanded>
              <b-field>
                <b-input
                  v-model="cinematic.downloadUrl"
                  placeholder="https://cdn.oneguy.io/cinematics/petra-1.mp4"
                  expanded
                ></b-input>
              </b-field>
            </b-field>
          </b-field>
          <br />
          <br />
          <div class="columns">
            <div class="column is-4 va">
              <label style="font-weight: bold"
                >Upload Cinematic Thumbnail Image</label
              ><br />
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
            <div class="column ">
              <div id="preview">
                <img width="100%" v-if="previewUrl" :src="previewUrl" />
              </div>
            </div>
          </div>
          <br /><br />
          <button @click="processCinematic" class="button is-medium is-primary">
            Add Cinematic
          </button>
          <br /><br />
          <h2 class="subtitle">{{ status }}</h2>
          <br /><br /><br /><br />
          <h3 class="heading">Step 2: Review Queue</h3>
          <hr />
          <br />
          <br />
          <div v-if="queue.length > 0" class="columns">
            <div class="column is-12">
              <b-table :data="queue" :columns="columns"></b-table>
            </div>
          </div>
          <br />
          <br />
          <h3 class="heading">Step 3: Proccess Queue</h3>
          <hr />
          <br />
          <br />
          <div v-if="!queueProcessed" class="field has-text-centered">
            <b-checkbox v-model="checkbox">
              I have added all cinematics and verified their content.
            </b-checkbox>
            <br />
            <br />
            <button
              :disabled="!checkbox"
              @click="processQueue"
              class="button is-medium is-primary"
            >
              Process Cinematic Queue
            </button>
          </div>
          <div v-else>
            <h1 class="title">Queue Successfully Processed!</h1>
            <a
              v-if="queueProcessed"
              :href="fullMapUrl"
              target="_blank"
              class="button is-medium is-primary"
            >
              View {{ mapName }} Page
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { db } from '@/main'
import uuidv4 from 'uuid/v4'
import axios from 'axios'
import _ from 'lodash'
export default {
  data() {
    return {
      status: '',
      loading: false,
      checkbox: false,
      file: undefined,
      queue: [],
      cinematic: {
        _id: undefined,
        downloadUrl: '',
        thumbnailUrl: undefined,
        number: undefined
      },
      counter: 1,
      mapName: '',
      gameName: '',
      columns: [
        {
          field: 'number',
          label: 'Cinematic Number',
          numeric: true
        },
        {
          field: 'downloadUrl',
          label: 'Download URL'
        },
        {
          field: 'thumbnailUrl',
          label: 'Thumbnail URL'
        }
      ],
      queueProcessed: false
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
      return '/cinematics/' + _.toLower(this.gameName) + '/' + this.kebabName
    },
    kebabName: function() {
      return this.convertToKebabCase(this.mapName)
    },
    fullMapUrl: function() {
      return 'https://oneguy.io' + this.mapUrl
    }
  },
  methods: {
    processCinematic() {
      this.queueProcessed = false
      this.cinematic._id = uuidv4()
      this.cinematic.number = this.counter
      this.uploadToCdn()
    },
    uploadToCdn() {
      this.loading = true
      let file = this.file
      let fileName = `${this.kebabName}-${this.counter}`
      let url = `https://storage.bunnycdn.com/oneguy/app/games/${_.toLower(
        this.gameName
      )}/thumbnails/${fileName}.jpg`
      let config = {
        headers: {
          AccessKey: process.env.VUE_APP_BCDN_API_KEY
        }
      }
      if (!file) {
        console.log('no file')
        return
      } else {
        axios.put(url, file, config).then(
          response => {
            if (response.status == 201) {
              let finalUrl = `https://cdn.oneguy.io/app/games/${_.toLower(
                this.gameName
              )}/thumbnails/${fileName}.jpg`
              this.cinematic.thumbnailUrl = finalUrl
              this.queueCinematic()
            }
          },
          error => {
            alert(error.message)
          }
        )
      }
    },
    queueCinematic() {
      this.queue.push(this.cinematic)
      this.status = `
        Added cinematic ${this.cinematic._id} to the queue. Current queue count is ${this.counter}`
      this.counter++
      this.file = undefined
      this.cinematic = {
        _id: undefined,
        downloadUrl: undefined,
        thumbnail: undefined,
        number: undefined
      }
    },
    processQueue() {
      let cinematicsQueue = this.queue
      let map = this.kebabName
      cinematicsQueue.map(doc => {
        let cinematic = {
          _id: doc._id,
          downloadUrl: doc.downloadUrl,
          thumbnail: doc.thumbnailUrl,
          number: doc.number
        }
        setTimeout(() => {
          db.collection('maps')
            .doc(map)
            .collection('cinematics')
            .add(cinematic)
        }, 200)
        this.queue = []
      })
      this.queueProcessed = true
    },
    convertToKebabCase(string) {
      return string.replace(/\s+/g, '-').toLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
.add-map {
  margin-bottom: 15rem;
}
.title {
  font-size: 1.4rem;
  margin-bottom: 5px;
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
