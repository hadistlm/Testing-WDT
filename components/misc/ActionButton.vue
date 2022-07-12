<template>
  <div @mouseover="show = true" @mouseleave="show = false" class="relative hover-trigger">
    <button class="bg-blue-500 p-3 rounded shadow-inner">
      <div class="flex">
        <span class="text-white">Options</span>
        <svg
          class="h-4 ml-2 mt-1"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 129 129"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          enable-background="new 0 0 129 129">
          <g>
            <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/>
          </g>
        </svg>
      </div>
    </button>
    <div class="bg-transparent mx-2 h-1"></div>
    <div v-if="show" class="hover-target absolute bg-white rounded shadow-md w-28 border z-50">
      <ul class="list-reset">
        <li v-if="ignored">
          <NuxtLink v-if="deleteAction.method.type === 'link'" :to="deleteAction.method.url + deleteAction.data.id" class="px-4 py-2 block text-red-600 hover:bg-grey-700">Delete</NuxtLink>
          <span  v-if="deleteAction.method.type === 'alert'" @click="openDelete = !openDelete" class="px-4 py-2 block text-red-600 hover:bg-grey-700 cursor-pointer">Delete</span>
        </li>
        <li><hr class="border-t mx-2 border-grey-light"></li>
        <li>
          <NuxtLink v-if="editAction.method.type === 'link'" :to="editAction.method.url + editAction.data.id" class="px-4 py-2 block text-blue-600 hover:bg-grey-700">Edit</NuxtLink>
          <span v-if="editAction.method.type === 'alert'" @click="editClick(editAction.data)" class="px-4 py-2 block text-blue-600 hover:bg-grey-700 cursor-pointer">Edit</span>
        </li>
        <li><hr class="border-t mx-2 border-grey-light"></li>
        <li>
          <NuxtLink v-if="detailAction.method.type === 'link'" :to="detailAction.method.url + detailAction.data.id" class="px-4 py-2 block text-blue-600 hover:bg-grey-700">Detail</NuxtLink>
          <span v-if="detailAction.method.type === 'alert'" @click="detailClick(detailAction.data)" class="px-4 py-2 block text-blue-600 hover:bg-grey-700 cursor-pointer">Detail</span>
        </li>
      </ul>
    </div>
    <MiscActionAlert
      :open="openDelete"
      :message="deleteMessage"
      @onchange="deleteClick" />
  </div>
</template>

<script>
export default {
  props: {
    module: {
      type: String,
      required: true
    },
    ignored: {
      type: Boolean,
      default: false
    },
    deleteAction: {
      type: Object,
      required: true
    },
    editAction: {
      type: Object,
      required: true
    },
    detailAction: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      deleteMessage: 'Do you want to delete this data?',
      openDelete: false,
      show: false
    }
  },
  methods: {
    detailClick (payload) {
      this.$store.commit('openModalToggle', { type: 'detail', data: payload })
    },
    editClick (payload) {
      this.$store.commit('openModalToggle', { type: 'edit', data: payload })
    },
    deleteClick (payload) {
      this.openDelete = !this.openDelete

      // if approved to be deleted
      if (payload) {
        this.$store.commit('updateDeleteAction', {
          module: this.module,
          data: this.deleteAction.data,
          status: payload
        })
      }
    }
  }
};
</script>
