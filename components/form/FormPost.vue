<template>
  <form class="flex flex-col w-full">
    <div class="relative">
      <label for="title" class="text-base leading-7 text-blueGray-500">Title</label>
      <input
        v-model="forminput.title"
        type="text"
        id="title"
        name="title"
        placeholder="Title Article"
        class="border w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-outline ring-offset-2"
        :class="errorsData.find(arr => arr.id === 'title') ? 'ring-2 ring-red-300 shadow-outline ring-offset-2' : ''"
      >
      <small v-show="errorsData.find(arr => arr.id === 'title')" class="text-red-500">{{ showError('title') }}</small>
    </div>
    <div class="relative mt-4">
      <label for="body" class="text-base leading-7 text-blueGray-500">Article Body</label>
      <textarea
        v-model="forminput.body"
        type="text"
        id="body"
        name="body"
        placeholder="Body Article"
        class="border w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100  focus:border-blueGray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-outline ring-offset-2"
        :class="errorsData.find(arr => arr.id === 'body') ? 'ring-2 ring-red-300 shadow-outline ring-offset-2' : ''"
      ></textarea>
      <small v-show="errorsData.find(arr => arr.id === 'body')" class="text-red-500">{{ showError('body') }}</small>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      errorsData: [],
      forminput: {
        mode: 'create',
        id: '',
        title: '',
        body: ''
      }
    }
  },
  mounted () {
    this.$store.watch(state => state.openModal, (value) => {
      if (value) { this.fetchData() }
    });
  },
  methods: {
    fetchData () {
      // const editedData = this.$store.getters.getModalInfo;
    },
    showError (payload) {
      const exist = this.errorsData.find(arr => arr.id === payload)

      return typeof exist !== 'undefined' ? exist.message : ''
    },
    validateData () {
      let errors = [];
      if (!this.forminput.title) {
        errors = [...errors, {
          id: 'title',
          message: 'Word value cannot be empty'
        }]
      }

      if (!this.forminput.body) {
        errors = [...errors, {
          id: 'body',
          message: 'Article body value cannot be empty'
        }]
      }

      this.errorsData = errors;

      return {
        status: errors.length > 0 ? 'failed' : 'success',
        message: errors.length > 0 ? errors : 'all data validated'
      }
    },
    getData () {
      return {
        ...this.forminput
      }
    },
    resetData () {
      this.errorsData = []
      this.forminput = {
        mode: 'create',
        id: '',
        title: '',
        body: ''
      };
    }
  }
}
</script>
