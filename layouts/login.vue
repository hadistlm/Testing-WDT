<template>
  <div class="box-center md:py-78px h-screen">
    <Nuxt />
  </div>
</template>

<script>
import pathToTitle from '@/helpers/pathToTitle.js'

export default {
  head () {
    return {
      title: this.pathFormatted
    }
  },
  computed: {
    pathFormatted () {
      return pathToTitle(this.$route.path.substring(1))
    }
  }
}
</script>
