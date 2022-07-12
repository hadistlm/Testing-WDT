<template>
  <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Username
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Comment
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Post Date
            </th>
          </tr>
        </thead>
        <tbody v-if="resultSet && resultSet.length > 0">
          <tr v-for="item in resultSet" :key="item.id">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ item.id }}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ item.username }}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ item.comment }}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ item.posted_date }}</p>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm" colspan="7">
              <p class="text-red-600 font-bold whitespace-no-wrap text-center">Data Not Found</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      resultSet: []
    }
  },
  mounted () {
    this.$store.watch(state => state.openModal, (value) => {
      if (value) { this.fetchData() }
    });
  },
  methods: {
    async fetchData () {
      const retrievedItem = this.$store.getters.getModalInfo;

      // current form is edit mode
      if (retrievedItem.id === 'postDetail' && retrievedItem.type === 'detail') {
        const fetch = await this.$axios.get(`/api/v1/post/${retrievedItem.refs.slug}`);

        // success retrieved
        if (fetch.status === 200 && fetch.data.status === 'success') {
          this.resultSet = fetch.data.data.comments;
        }
      }
    },
    resetData () {
      this.resultSet = [];
    },
    formatDate (date, format) {
      return moment(date).format(format);
    }
  }
}
</script>
