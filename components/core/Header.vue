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
            <input type="search" class="mt-2.5 cursor-pointer relative z-10 h-10 w-12 rounded-full border input-background pl-12 outline-none focus:border-lime-300 focus:pl-16 focus:pr-4" placeholder="Cari Pegawai" />
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
                  <button @click="logOut()" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Sign out</button>
                </li>
              </ul>
            </div>
          </div>
          <div class="hidden md:flex px-6">
            <form action="" class="relative mx-auto w-max">
              <input type="search" class="w-full mt-2.5 cursor-pointer relative z-10 h-10 w-12 rounded-lg border input-background pl-12 outline-none focus:border-lime-300 focus:pl-16 focus:pr-4" placeholder="Cari Pegawai" />
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
        <a class="flex flex-col items-center justify-end pb-2" href="#">
          <img src="@/assets/icon/core-menu.svg" class="pb-4">
        </a>
        <a class="flex flex-col items-center justify-end" href="#">
          <img src="@/assets/icon/core-menu.svg" class="pb-4">
          <div class="w-10/12 border-t-4 menu-selected rounded"></div>
        </a>
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
  .input-background{
    background-color: rgb(156, 163, 175, 0.2);
  }
  .top-dropdownmb{
    top: 6.5rem;
  }
</style>
