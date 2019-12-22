<template>
  <div></div>
</template>

<script>
import { db } from '@/main'
export default {
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
