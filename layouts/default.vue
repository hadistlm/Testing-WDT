<template>
  <div class="flex h-screen">
    <div class="flex-1 flex flex-col overflow-hidden">
      <div id="header" class="sticky top-0 shadow-lg">
        <CoreHeader />
      </div>
      <div class="flex h-full">
        <div
          id="sidebar"
          :class="{
            'sidebarHidden' : this.$store.state.sidebarStatus === false,
            'sidebarShow' : this.$store.state.sidebarStatus === true
          }">
          <CoreSidebar />
        </div>
        <main class="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14 major-background">
          <div class="flex w-full mx-auto px-6 py-8">
            <Nuxt />
          </div>
        </main>
      </div>
    </div>
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

<style scoped>
  .major-background{
    background-color: #F5F5F5;
  }
  .btn-floating{
    background-color: #3D5A80;
  }
  .sidebarHidden{
    width: 3.35rem;
    transition:all .3s ease-out;
  }
  .sidebarShow{
    width: 20%;
    transition:all .3s ease-in;
  }
</style>
