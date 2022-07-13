<template>
  <div
    class="
      h-193px
      bg-orange-brand
      pt-35px
      px-4
      md:px-102px
      relative
      rounded-bl-56px rounded-br-56px
      relative
      z-20
    "
  >
  <div class="pt-6 px-4">
    <div class="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div class="flex items-center">
          <div class="flex-shrink-0">
             <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{{ numberFormat(dataList.new_post) }}</span>
             <h3 class="text-base font-normal text-gray-500">New posts this week</h3>
          </div>
          <div class="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
             {{ dataList.new_post_percent }}%
             <svg v-if="dataList.new_post_percent > 0" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
             </svg>
             <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
             </svg>
          </div>
        </div>
      </div>
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div class="flex items-center">
          <div class="flex-shrink-0">
             <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{{ numberFormat(dataList.new_visitor) }}</span>
             <h3 class="text-base font-normal text-gray-500">Visitors this week</h3>
          </div>
          <div class="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
              {{ dataList.new_visitor_percent }}%
              <svg v-if="dataList.new_visitor_percent > 0" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
             </svg>
          </div>
        </div>
      </div>
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div class="flex items-center">
          <div class="flex-shrink-0">
             <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{{ numberFormat(dataList.new_comments) }}</span>
             <h3 class="text-base font-normal text-gray-500">User comments this week</h3>
          </div>
          <div class="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
              {{ dataList.new_comments_percent }}%
              <svg v-if="dataList.new_comments_percent > 0" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
      <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold leading-none text-gray-900">Latest Visitors | Comments</h3>
        </div>
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200">
            <li v-for="item in dataList.latest_visitor" :key="item.id" class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                 <div class="flex-shrink-0">
                    <img class="h-8 w-8 rounded-full" :src="item.avatar">
                 </div>
                 <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">
                      {{ item.username }}
                    </p>
                    <p class="text-sm text-gray-500 truncate">
                      [<span class="italic"> {{ item.email }} </span>]
                    </p>
                 </div>
                 <div class="inline-flex items-center text-base font-semibold text-gray-900">
                    {{ item.comments }}
                 </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage',
  middleware: 'isAuthenticated',
  data () {
    return {
      dataList: []
    }
  },
  async fetch () {
    await this.fetchData()
  },
  methods: {
    async fetchData () {
      const resultSet = await this.$axios.get('/api/v1/report/dashboard')

      this.dataList = resultSet.data.data
    },
    numberFormat (num) {
      return num ? num.toLocaleString('en-US') : ''
    }
  }
}
</script>

<style scoped></style>
