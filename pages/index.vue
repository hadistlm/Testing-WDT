<template>
  <div class="major-background">
    <header class="shadow">
      <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="#_" class="flex items-center base-color">
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
          </a>
          <div class="flex items-center lg:order-2">
            <NuxtLink to="/" class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Home</NuxtLink>
            <NuxtLink to="/login" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log in</NuxtLink>
          </div>
        </div>
      </nav>
    </header>
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-4 mx-auto max-w-7x1">
        <div class="flex flex-wrap w-full mb-4 p-4">
          <div class="w-full mb-6 lg:mb-0">
            <h1 class="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900">Blog Post</h1>
            <div class="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
        </div>
        <div class="flex flex-wrap -m-4">
          <div v-for="article in postList" :key="article.id" class="xl:w-1/3 md:w-1/2 p-4">
            <div class="bg-white p-6 rounded-lg">
              <img
                :src="article.image_link"
                class="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6"
                alt="Image Size 720x400"
              >
              <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">{{ article.category }}</h3>
              <h2 class="text-lg text-gray-900 font-medium title-font mb-4">{{ article.title }}</h2>
              <p class="leading-relaxed text-base">{{ trimString(article.body) }}</p>
              <a href="#" class="inline-flex mt-3 items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Read more
                <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <CoreFooter />
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'LandingPage',
  layout: 'login',
  middleware: 'isLoggedin',
  data () {
    return {
      postList: []
    }
  },
  async fetch () {
    await this.fetchData()
  },
  methods: {
    async fetchData () {
      const resultSet = await this.$axios.get('/api/v1/post', {
        params: {
          page: 1,
          per_page: 10,
          fixData: 6
        }
      })

      this.postList = resultSet.data.data.map((res) => {
        return {
          id: res.id,
          title: res.title,
          slug: res.slug,
          category: res.category,
          image_link: res.image,
          body: res.body,
          created_by: res.created_by,
          created_at: moment(res.created_date).format('ddd, DD MMM YYYY'),
          updated_at: moment(res.last_edited).format('ddd, DD MMM YYYY')
        }
      })
    },
    trimString (str, max = 10) {
      const array = str.trim().split(' ');
      const ellipsis = array.length > max ? '...' : '';
      return array.slice(0, max).join(' ') + ellipsis;
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
