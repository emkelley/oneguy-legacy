<template>
  <section class="column add-map">
    <h1 class="title">Add New Cinematic</h1>
    <hr class="title-hr" />
    <br />
    <div class="columns">
      <div class="column is-12">
        <div class="og-card">
          <h2 class="subtitle">Step 1. Upload Cinematics to CDN</h2>
          <div class="og-card-content">
            <div class="columns is-multiline">
              <div class="column">
                <b-field label="Parent Game" expanded>
                  <b-field>
                    <b-input
                      v-model="gameName"
                      placeholder="Overwatch"
                      expanded
                      size="is-medium"
                    ></b-input>
                  </b-field>
                </b-field>
                <b-field label="Map Name" expanded>
                  <b-field>
                    <b-input
                      v-model="mapName"
                      placeholder="Watchpoint: Gibraltar"
                      expanded
                      size="is-medium"
                    ></b-input>
                  </b-field>
                </b-field>
                <b-field label="Count Starting Point" expanded>
                  <b-field>
                    <b-input
                      v-model="counter"
                      expanded
                      size="is-medium"
                    ></b-input>
                  </b-field>
                </b-field>
              </div>
              <div class="column is-12">
                <p style="font-weight: bold; color: #363636; font-size: 1rem">
                  Options:
                </p>
                Unless you have uploaded the files directly to the CDN, leave
                these checked.
                <br />
                <br />

                <b-checkbox v-model="options.uploadThumbnail">
                  I want to upload the thumbnail file
                </b-checkbox>
                <br />
                <b-checkbox v-model="options.uploadVideoFile">
                  I want to upload the cinematic file
                </b-checkbox>
                <br />
                <br />
              </div>
              <div class="column is-12">
                <div class="columns">
                  <div class="column">
                    <label style="font-weight: bold"
                      >Cinematic Thumbnail Image</label
                    ><br />
                    <b-field class="file">
                      <b-upload v-model="file" drag-drop>
                        <section class="section">
                          <div class="content has-text-centered">
                            <p>
                              <b-icon icon="upload" size="is-medium"> </b-icon>
                            </p>
                            <p>Drop your file here or click to upload</p>
                          </div>
                        </section>
                      </b-upload>
                    </b-field>
                    <span class="tag is-primary is-medium" v-if="file">
                      {{ file.name }}
                    </span>
                  </div>
                  <div class="column">
                    <label style="font-weight: bold"
                      >Cinematic Video File (MP4)</label
                    ><br />
                    <b-field class="file">
                      <b-upload v-model="cinematicFile" drag-drop>
                        <section class="section">
                          <div class="content has-text-centered">
                            <p>
                              <b-icon icon="upload" size="is-medium"> </b-icon>
                            </p>
                            <p>Drop your file here or click to upload</p>
                          </div>
                        </section>
                      </b-upload>
                    </b-field>
                    <span class="tag is-primary is-medium" v-if="cinematicFile">
                      {{ cinematicFile.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <br />
          <h3 class="heading has-text-centered">
            This will take 2-5 minutes depending on file size
          </h3>
          <nav class="level">
            <div class="level-item has-text-centered">
              <button
                @click="processCinematic()"
                :class="{ 'is-loading': addLoading }"
                :disabled="
                  addLoading ||
                  this.gameName == undefined ||
                  this.mapName == undefined
                "
                class="button is-medium is-primary is-outlined"
              >
                Upload and Add to Queue
              </button>
            </div>
          </nav>
          <p v-if="status" class="has-text-centered">
            <span v-if="status.type == 'success'">
              <i class="fad fa-check"></i> {{ status.message }}
            </span>
          </p>
        </div>
        <div class="og-card">
          <h2 class="subtitle">Step 2: Review Uploaded Cinematics</h2>
          <div class="og-card-content">
            <div class="columns">
              <div v-if="queue.length > 0" class="column is-12">
                <b-table :data="queue" :columns="columns"></b-table>
              </div>
              <div v-else class="column empty has-text-centered va">
                <center>
                  <i class="fal fa-empty-set fa-3x"></i>
                </center>
                <br />
                <p>Nothing has been uploaded yet</p>
                <p>Add a cinematic above to review uploaded cinematics.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="og-card">
          <h2 class="subtitle">Step 3: Add Cinematics Data to Firebase</h2>
          <br /><br />
          <div v-if="!queueProcessed" class="field has-text-centered">
            <b-checkbox v-model="checkbox">
              I have added all cinematics and verified their content.
            </b-checkbox>
            <br />
            <br />
            <button
              :disabled="!checkbox"
              @click="processQueue()"
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
import { uuid } from 'uuidv4'
import axios from 'axios'
import _ from 'lodash'
export default {
  data() {
    return {
      status: undefined,
      loading: false,
      checkbox: false,
      file: undefined,
      cinematicFile: undefined,
      queue: [],
      options: {
        uploadThumbnail: true,
        uploadVideoFile: true
      },
      cinematic: {
        _id: undefined,
        filePath: '',
        thumbnailUrl: undefined,
        number: undefined
      },
      counter: 1,
      mapName: undefined,
      gameName: undefined,
      columns: [
        {
          field: 'number',
          label: 'Cinematic Number'
        },
        {
          field: 'filePath',
          label: 'File Path'
        },
        {
          field: 'thumbnailUrl',
          label: 'Thumbnail URL'
        }
      ],
      queueProcessed: false,
      addLoading: false
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
    mapUrl: function () {
      return '/cinematics/' + _.toLower(this.gameName) + '/' + this.kebabName
    },
    kebabName: function () {
      return this.convertToKebabCase(this.mapName)
    },
    fullMapUrl: function () {
      return 'https://oneguy.io' + this.mapUrl
    },
    filePath: function () {
      return this.mapUrl + '/' + this.kebabName + '-' + this.counter + '.mp4'
    }
  },
  methods: {
    processCinematic() {
      this.addLoading = true
      this.queueProcessed = false
      this.cinematic._id = uuid()
      this.cinematic.number = Number(this.counter)
      if (this.mapName == undefined || this.gameName == undefined) {
        this.status = {
          type: 'failure',
          message: `An error occurred: Missing information`
        }
        setTimeout(() => {
          this.status = undefined
        }, 10000)
      } else {
        if (this.options.uploadThumbnail) {
          this.uploadThumbnail()
        } else if (this.options.uploadVideoFile) {
          this.uploadVideoFile()
        } else {
          this.queueCinematic()
        }
      }
    },
    uploadThumbnail() {
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
      axios.put(url, file, config).then(
        response => {
          if (response.status == 201) {
            let finalUrl = `https://cdn.oneguy.io/app/games/${_.toLower(
              this.gameName
            )}/thumbnails/${fileName}.jpg`
            this.cinematic.thumbnailUrl = finalUrl
            this.uploadVideoFile()
          }
        },
        error => {
          alert(error.message)
          this.status = {
            type: 'failure',
            message: `An error occurred adding thumbnail to CDN. ${error.message}`
          }
          setTimeout(() => {
            this.status = undefined
          }, 10000)
        }
      )
    },
    uploadVideoFile() {
      let cinematic = this.cinematicFile
      let fileName = this.counter
      let url = `https://storage.bunnycdn.com/oneguy/cinematics/${_.toLower(
        this.gameName
      )}/${fileName}.mp4`
      let config = {
        headers: {
          AccessKey: process.env.VUE_APP_BCDN_API_KEY
        }
      }
      const upload = new Promise((resolve, reject) => {
        axios
          .put(url, cinematic, config)
          .then(response => resolve(response))
          .catch(err => reject(err))
      })

      upload
        .then(response => {
          if (response.status == 201) {
            let filePath = `/cinematics/${_.toLower(this.gameName)}/${
              this.counter
            }.mp4`
            this.cinematic.filePath = filePath
            this.queueCinematic()
          }
        })
        .catch(error => {
          alert(error.message)
          this.status = {
            type: 'failure',
            message: `An error occurred adding video file to CDN. ${error.message}`
          }
          setTimeout(() => {
            this.status = undefined
          }, 10000)
        })
    },
    queueCinematic() {
      if (!this.options.uploadThumbnail) {
        let fileName = `${this.kebabName}-${this.counter}`
        this.cinematic.thumbnailUrl = `https://cdn.oneguy.io/app/games/${_.toLower(
          this.gameName
        )}/thumbnails/${fileName}.jpg`
      }
      if (!this.options.uploadVideoFile) {
        this.cinematic.filePath = `/cinematics/${_.toLower(this.kebabName)}/${
          this.counter
        }.mp4`
      }
      this.queue.push(this.cinematic)
      this.status = {
        type: 'success',
        message: `Successfully added cinematic to queue.`
      }
      this.counter++
      this.file = undefined
      this.cinematic = {
        _id: undefined,
        filePath: undefined,
        thumbnail: undefined,
        number: undefined
      }
      this.addLoading = false
      setTimeout(() => {
        this.status = undefined
      }, 10000)
    },
    processQueue() {
      let cinematicsQueue = this.queue
      let map = this.kebabName
      cinematicsQueue.map(doc => {
        let cinematic = {
          _id: doc._id,
          filePath: doc.filePath,
          thumbnail: doc.thumbnailUrl,
          number: doc.number
        }
        setTimeout(() => {
          db.collection('maps').doc(map).collection('cinematics').add(cinematic)
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
.upload {
  margin-top: 0.5rem;
  .section {
    padding-left: 7rem;
    padding-right: 7rem;
    padding-bottom: 2rem;
    padding-top: 2rem;
  }
}
</style>
