<template>
  <header>
    <nav class="bg-white border-gray-200">
      <div class="flex flex-wrap justify-between mx-auto">
        <div class="flex items-center px-4 lg:px-6 py-4">
          <div class="cursor-pointer" @click="toggleSidebar()">
            <img src="@/assets/icon/core-menu.svg" />
          </div>
          <span class="px-4 text-xl font-semibold whitespace-nowrap text-title">Testing WDT</span>
        </div>
        <div class="flex md:hidden px-4">
          <form action="" class="relative mx-auto w-max">
            <input type="search" class="mt-2.5 cursor-pointer relative z-10 h-10 w-12 rounded-full border input-background pl-12 outline-none focus:border-lime-300 focus:pl-16 focus:pr-4" placeholder="Cari Data" />
            <img src="@/assets/icon/core-magnifier.svg" class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500">
          </form>
        </div>
        <div class="hidden md:flex flex-row-reverse lg:order-2 px-4 h-100">
          <div
            @click="toggleDropdown()"
            class="flex flex-col justify-end items-center cursor-pointer w-12 pb-2">
            <img class="border-2 rounded-full menu-selected h-10 w-10" src="@/assets/icon/core-user.png">
            <div
              :class="{
                'hidden': !dropdownStatus
              }"
              class="absolute top-12 right-3 bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4">
              <div class="px-4 py-3">
                <span class="block text-sm">{{ user && user.displayname }}</span>
                <span class="block text-sm font-medium text-gray-900 truncate">{{ user && user.email }}</span>
              </div>
              <ul class="py-1" aria-labelledby="dropdown">
                <li>
                  <button @click="logOut()" class="w-full text-left text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Sign out</button>
                </li>
              </ul>
            </div>
          </div>
          <div class="hidden md:flex px-6">
            <form action="" class="relative mx-auto w-max">
              <input type="search" class="w-full mt-2.5 cursor-pointer relative z-10 h-10 w-12 rounded-lg border input-background pl-12 outline-none focus:border-lime-300 focus:pl-16 focus:pr-4" placeholder="Cari Data" />
              <img src="@/assets/icon/core-magnifier.svg" class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500">
            </form>
          </div>
        </div>
      </div>
      <div
        :class="{
          'hidden': !navbar
        }"
        class="md:hidden grid grid-cols-3 gap-3 mt-3 shadow-lg"
      >
        <NuxtLink
          to="/dashboard"
          class="flex flex-col items-center justify-end"
        >
          <svg
            :class="{
              'mb-2 text-gray-400' : currentPath !== 'dashboard',
              'basic-color' : currentPath === 'dashboard'
            }"
            class="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z" class="fill-current text-cyan-400 dark:fill-slate-600"></path>
            <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z" class="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
            <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z" class="fill-current group-hover:text-sky-300"></path>
          </svg>
          <div v-show="currentPath === 'dashboard'" class="w-10/12 mt-2 border-t-4 menu-selected rounded"></div>
        </NuxtLink>
        <NuxtLink
          to="/admin/posts"
          class="flex flex-col items-center justify-end"
        >
          <svg
            :class="{
              'mb-2 text-gray-400' : currentPath !== 'posts',
              'basic-color' : currentPath === 'posts'
            }"
            class="h-10 w-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path class="fill-current" fill-rule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clip-rule="evenodd" />
            <path class="fill-current text-gray-400" d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
          </svg>
          <div v-show="currentPath === 'posts'" class="w-10/12 mt-2 border-t-4 menu-selected rounded"></div>
        </NuxtLink>
        <div @click="toggleDropdown()" class="flex flex-col justify-end items-center pb-2">
          <img class="border-2 rounded-full menu-selected h-10 w-10" src="@/assets/icon/core-user.png">
          <div
            :class="{
              'hidden': !dropdownStatus
            }"
            class="absolute top-dropdownmb right-3 bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4">
            <div class="px-4 py-3">
              <span class="block text-sm">{{ user && user.displayname }}</span>
              <span class="block text-sm font-medium text-gray-900 truncate">{{ user && user.email }}</span>
            </div>
            <ul class="py-1" aria-labelledby="dropdown">
              <li>
                <button @click="logOut()" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Sign out</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data () {
    return {
      dropdownStatus: false
    }
  },
  computed: {
    currentPath () {
      return this.$route.path.split('/').pop()
    },
    user () {
      return this.$cookies.get('auth._user')
    },
    navbar () {
      return this.$store.getters.getSidebarInfo
    }
  },
  methods: {
    toggleDropdown () {
      this.dropdownStatus = !this.dropdownStatus;
    },
    toggleSidebar () {
      this.$store.commit('sidebarToggle');
    },
    async logOut () {
      const session = this.$cookies.get('auth')

      if (session) {
        await this.$auth.logout('local').then((res) => {
          // remove session cookie
          this.$cookies.remove('auth')
          // remove session cookie
          this.$cookies.remove('auth._user')
          // redirect to frontpage
          this.$router.push('/')
        })
      }
    }
  }
}
</script>

<style scoped>
  .text-title{
    color: #3D5A80;
  }
  .menu-selected{
    border-color: #EE6C4D;
  }
  .basic-color {
    color: #EE6C4D;
  }
  .input-background{
    background-color: rgb(156, 163, 175, 0.2);
  }
  .top-dropdownmb{
    top: 6.5rem;
  }
</style>
