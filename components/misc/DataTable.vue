<template>
  <div class="relative">
    <div class="md:grid grid-rows-1 grid-flow-col gap-4 pt-19px">
      <div class="w-full">
        <div class="bg-white px-3 py-3 rounded-b-lg md:rounded-lg shadow-brand">
          <div class="sm:flex items-center justify-between">
            <div class="flex gap-3 items-center justify-between">
              <div
                v-if="config.perpageButton !== false"
                class="
                  md:w-48
                  w-full
                  py-3
                  px-4
                  flex
                  items-center
                  text-sm
                  font-medium
                  leading-none
                  text-gray-600
                  bg-gray-200
                  hover:bg-gray-300
                  cursor-pointer
                  rounded
                "
              >
                <div class="grid grid-cols-2 w-full">
                  <p>
                    {{ typeof config.perpageButton === 'object' ? config.perpageButton.text : 'Per Page:' }}
                  </p>
                  <select
                    v-if="typeof config.perpageButton === 'object' && config.perpageButton.type === 'custom'"
                    v-model="tableProperty[config.perpageButton.modelReference]"
                    aria-label="select"
                    class="
                      focus:text-indigo-600 focus:outline-none
                      bg-transparent
                      ml-1
                    "
                    @change="changedSelect"
                  >
                    <option
                      v-for="perdata in config.perpageButton.options"
                      :key="perdata"
                      :value="perdata"
                    >
                      {{ perdata }}
                    </option>
                  </select>
                  <select
                    v-else
                    v-model="tableProperty.perpage"
                    aria-label="select"
                    class="
                      focus:text-indigo-600 focus:outline-none
                      bg-transparent
                      ml-1
                    "
                    @change="changedSelect"
                  >
                    <option
                      v-for="perdata in tableProperty.listperpage"
                      :key="perdata"
                      :value="perdata"
                    >
                      {{ perdata }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="flex gap-3 items-center justify-between">
              <button
                v-if="checkNode.some(obj => obj.status === true)"
                @click="openDelete = !openDelete"
                class="
                  ring-2 ring-offset-2 ring-red-600
                  mt-4
                  sm:mt-0
                  inline-flex
                  items-start
                  justify-start
                  px-4
                  py-3
                  bg-red-600
                  focus:outline-none
                  rounded
                "
              >
                <p class="text-sm font-medium leading-none text-white">
                  Delete Selected
                </p>
              </button>
              <NuxtLink
                v-if="typeof config.createButton === 'object' && config.createButton.type === 'link'"
                :to="config.createButton.url"
                class="
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600
                  mt-4
                  sm:mt-0
                  inline-flex
                  items-start
                  justify-start
                  px-6
                  py-3
                  bg-indigo-700
                  hover:bg-indigo-600
                  focus:outline-none
                  rounded
                "
              >
                <p class="text-sm font-medium leading-none text-white">
                  {{ config.createButton.text ? config.createButton.text : `Add ${title}` }}
                </p>
              </NuxtLink>
              <button
                v-if="typeof config.createButton === 'object' && config.createButton.type === 'modal'"
                @click="Object.prototype.hasOwnProperty.call(config.createButton, 'emitFeedback') ? config.createButton.emitFeedback() : toggle()"
                class="
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600
                  mt-4
                  sm:mt-0
                  inline-flex
                  items-start
                  justify-start
                  px-6
                  py-3
                  bg-indigo-700
                  hover:bg-indigo-600
                  focus:outline-none
                  rounded
                "
              >
                <p class="text-sm font-medium leading-none text-white">
                  {{ config.createButton.text ? config.createButton.text : `Add ${title}` }}
                </p>
              </button>
              <div
                v-if="config.searchButton"
                class="
                  flex
                  relative
                  items-center
                "
              >
                <input
                  type="search"
                  @keyup="changeSearch"
                  @search="changeSearch"
                  v-model="tableProperty.search"
                  class="
                    mt-3 md:mt-0
                    w-full
                    pl-10
                    py-3
                    px-4
                    font-medium
                    leading-none
                    text-gray-600
                    bg-gray-200
                    hover:bg-gray-300
                    cursor-pointer
                    rounded
                  "
                  placeholder="Search..."
                />
                <div class="mt-3 md:mt-0 absolute top-0 left-0 inline-flex items-center p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-gray-400"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-7 overflow-x-auto">
            <table class="w-full table-auto">
              <thead>
                <tr class="focus:outline-none h-16 border border-gray-100 rounded">
                  <td class="text-center">
                    <div v-if="config.deleteBulk" class="ml-5">
                      <div
                        class="
                          bg-gray-200
                          rounded-sm
                          w-5
                          h-5
                          flex flex-shrink-0
                          justify-center
                          items-center
                          relative
                        "
                      >
                        <input
                          placeholder="checkbox"
                          type="checkbox"
                          :checked="checkedall"
                          :class="checkedall ? 'opacity-100' : 'opacity-0'"
                          @click="checkAll"
                          class="
                            checkbox
                            absolute
                            cursor-pointer
                            w-full
                            h-full
                          "
                        />
                      </div>
                    </div>
                    <span
                      v-else
                    >
                      <p class="
                        text-base
                        font-medium
                        leading-none
                        text-gray-700
                        px-2
                      ">
                        No.
                      </p>
                    </span>
                  </td>
                  <td
                    v-for="(header, index) in headerColumn"
                    :key="index"
                    :class="{'text-center': header.center}"
                    class="px-2"
                  >
                    {{ header.name }}
                  </td>
                  <td v-if="typeof config.actionButton === 'object'" class="w-32 text-center">Action</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-show="datasets.length > 0"
                  v-for="(items, number) in datasets"
                  :key="items.id"
                  class="focus:outline-none h-16 border border-gray-100 rounded"
                >
                  <td class="text-center">
                    <div v-if="config.deleteBulk" class="ml-5">
                      <div
                        class="
                          bg-gray-200
                          rounded-sm
                          w-5
                          h-5
                          flex flex-shrink-0
                          justify-center
                          items-center
                          relative
                        "
                      >
                      {{  }}
                        <input
                          placeholder="checkbox"
                          type="checkbox"
                          :checked="checkNode.find(arr => arr.id === items.id).status"
                          :class="checkNode.find(arr => arr.id === items.id).status ? 'opacity-100' : 'opacity-0'"
                          @click="toggleNode(checkNode.find(arr => arr.id === items.id))"
                          class="
                            focus:opacity-100
                            checkbox
                            opacity-0
                            absolute
                            cursor-pointer
                            w-full
                            h-full
                          "
                        />
                      </div>
                    </div>
                    <span
                      v-else
                      class="text-center"
                    >
                      <p class="
                        text-base
                        font-medium
                        leading-none
                        text-gray-700
                        mr-2
                      ">
                        {{ ++number }}
                      </p>
                    </span>
                  </td>
                  <td
                    v-for="(header, index) in headerColumn"
                    :key="index"
                    :class="{'text-center': header.center}">
                    <div
                      class="flex "
                      :class="{
                        'justify-around': header.center,
                        'justify-start': !header.center
                      }"
                    >
                      <!-- if block flag is active but not logic provided -->
                      <button
                        v-if="header.block && !header.blockLogic"
                        class="
                          py-3
                          px-3
                          text-sm
                          focus:outline-none
                          leading-none
                          text-green-700
                          bg-green-100
                          rounded
                        "
                      >
                        {{ items[header.variable] }}
                      </button>
                      <!-- if block flag is active and logic provided -->
                      <button
                        v-if="header.block && header.blockLogic"
                        :class="header.blockLogic(items[header.variable])"
                        class="
                          py-3
                          px-3
                          text-sm
                          focus:outline-none
                          leading-none
                          rounded
                        "
                      >
                        {{ items[header.variable] }}
                      </button>
                      <!-- block flag is not provided -->
                      <p
                        v-if="!header.block"
                        class="
                          text-base
                          font-medium
                          leading-none
                          text-gray-700
                          px-2
                        "
                      >
                        {{ items[header.variable] }}
                      </p>
                    </div>
                  </td>
                  <td v-if="typeof config.actionButton === 'object'" class="text-center">
                    <MiscActionButton
                      :module="title"
                      :ignored="!(Object.keys(ignoredData).length > 0 && items[Object.keys(ignoredData)[0]].includes(ignoredData[Object.keys(ignoredData)[0]]))"
                      :deleteAction="{method:config.actionButton.delete, data:items }"
                      :editAction="{method:config.actionButton.edit, data:items }"
                      :detailAction="{method:config.actionButton.detail, data:items }"
                    />
                  </td>
                </tr>
                <tr
                  v-show="datasets.length < 1"
                  class="focus:outline-none h-16 border border-gray-100 rounded"
                >
                  <td class="text-center" :colspan="headerColumn.length+2">
                    <p class="text-lg text-red-600"> Data empty</p>
                  </td>
                </tr>
                <tr class="h-3"></tr>
              </tbody>
            </table>
          </div>
          <div
            class="grid lg:grid-cols-4 lg:gap-2 grid-cols-1 overflow-x-scroll"
            v-if="Object.getOwnPropertyNames(dataPage).length !== 0"
          >
            <div class="flex py-3">
              <p class="text-lg">Total : {{ tableProperty.totalData }} / {{ tableProperty.perpage }}</p>
            </div>
            <div class="flex items-center justify-end col-span-3">
              <MiscPagination :data="dataPage" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <MiscActionAlert
      :open="openDelete"
      :message="deleteMessage"
      @onchange="deleteAll"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash';

export default {
  data () {
    return {
      openDelete: false,
      deleteMessage: 'Are You sure want to delete selected data?',
      checkedall: false,
      checkNode: []
    }
  },
  props: {
    config: {
      type: Object,
      default () {
        return {
          actionButton: {
            edit: {
              type: 'link',
              url: '/'
            },
            delete: {
              type: 'link',
              url: '/'
            },
            detail: {
              type: false,
              url: ''
            }
          },
          createButton: {
            type: 'link',
            url: '/'
          },
          searchButton: true,
          perpageButton: true,
          deleteBulk: false
        }
      }
    },
    title: {
      type: String,
      required: true
    },
    headerColumn: {
      type: Array,
      required: true
    },
    datasets: {
      type: [Object, Array],
      required: true
    },
    ignoredData: {
      type: Object,
      default () {
        return {}
      }
    },
    dataPage: {
      type: Object,
      required: true
    }
  },
  computed: {
    tableProperty () {
      return {
        ...this.dataPage
      }
    }
  },
  watch: {
    datasets (setdata) {
      this.checkNode = this.datasets.map(function (res, index) {
        return { id: res.id, status: false }
      })
    }
  },
  methods: {
    checkAll () {
      const statusNew = !this.checkedall;
      this.checkedall = statusNew
      this.checkNode = this.datasets.map(function (res, index) {
        return { id: res.id, status: statusNew }
      })
    },
    toggleNode (payload) {
      this.checkNode = this.checkNode.map(function (res, index) {
        return {
          id: res.id,
          status: res.id === payload.id ? !payload.status : res.status
        }
      })
    },
    deleteAll (payload) {
      if (payload) {
        this.$emit('deleteBatch', this.checkNode.filter(res => res.status === true));
      }

      this.openDelete = false;
    },
    toggle () {
      this.$store.commit('openModalToggle')
    },
    changedSelect () {
      this.$emit('onchanged', this.tableProperty);
    },
    changeSearch: debounce(function () {
      this.$emit('onchanged', this.tableProperty);
    }, 500)
  }
}
</script>
