<template>
  <div class="major-background">
    <header class="shadow">
      <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <NuxtLink to="/" class="flex items-center base-color">
            <svg class="h-8 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005">
              <rect
                fill="#2a2a31"
                x="16.539"
                y="425.626"
                width="479.767"
                height="50.502"
                transform="matrix(1,0,0,1,0,0)"
              />
              <path class="plane-take-off" d=" M 510.7 189.151 C 505.271 168.95 484.565 156.956 464.365 162.385 L 330.156 198.367 L 155.924 35.878 L 107.19 49.008 L 211.729 230.183 L 86.232 263.767 L 36.614 224.754 L 0 234.603 L 45.957 314.27 L 65.274 347.727 L 105.802 336.869 L 240.011 300.886 L 349.726 271.469 L 483.935 235.486 C 504.134 230.057 516.129 209.352 510.7 189.151 Z " />
            </svg>
            <p class="font-bold ml-2">WeBlog</p>
          </NuxtLink>
          <div class="flex items-center lg:order-2">
            <NuxtLink to="/" class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Home</NuxtLink>
            <NuxtLink to="/login" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log in</NuxtLink>
          </div>
        </div>
      </nav>
    </header>
    <div class="text-center pt-16 md:pt-32">
      <p class="text-sm md:text-base text-green-500 font-bold">
        {{ formatDate(resultSet.created_date) }} <span class="text-gray-900">/</span> {{ resultSet.category }}
      </p>
      <h1 class="font-bold break-normal text-3xl md:text-5xl">{{ resultSet.title }}</h1>
    </div>
    <div
      class="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded"
      :style="{
        backgroundImage: `url(${resultSet.image})`,
        height: '75vh'
      }"></div>
    <div class="container max-w-5xl mx-auto lg:-mt-32">
      <div class="mx-0 sm:mx-6">
        <div class="bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal" style="font-family:Georgia,serif;">
          {{ resultSet.body }}
        </div>
        <div class="flex w-full items-center font-sans p-8 md:p-24">
          <img class="w-10 h-10 rounded-full mr-4" src="http://i.pravatar.cc/300" alt="Avatar of Author">
          <div class="flex-1">
            <p class="text-base font-bold text-base md:text-xl leading-none">{{ resultSet.created_by }}</p>
            <p class="text-gray-600 text-xs md:text-base">Writer of this article</p>
          </div>
        </div>
      </div>
    </div>
    <CoreFooter />
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'PostDetail',
  layout: 'login',
  auth: false,
  data () {
    return {
      resultSet: []
    }
  },
  async fetch () {
    await this.fetchData()
  },
  methods: {
    async fetchData () {
      const slugname = this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1)
      const fetch = await this.$axios.get(`/api/v1/post/${slugname}`)

      // success retrieved
      if (fetch.status === 200 && fetch.data.status === 'success') {
        this.resultSet = fetch.data.data;
      }
    },
    formatDate (string) {
      return moment(string).format('DD MMM YYYY')
    }
  }
}
</script>

<style scoped>
  .base-color{
    color: #EE6C4D;
  }
  .major-background{
    background-color: #F5F5F5;
  }
</style>
