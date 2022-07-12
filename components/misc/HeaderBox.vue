<template>
  <div class="md:grid grid-rows-1 grid-flow-col gap-4 pt-19px">
    <div
      class="px-4 py-4 grid bg-white rounded-b-lg md:rounded-lg shadow-brand"
    >
      <div class="mx-auto max-w-screen-lg h-full bg-red-500 p-4 rounded">
        <img
          :src="require(`@/assets/icon/${icon}`)"
          class="mx-auto sm:w-10 lg:w-24 xl:w-32"
          alt="icon"
        />
      </div>
    </div>
    <div
      class="px-8 py-8 grid bg-white rounded-b-lg md:rounded-lg shadow-brand"
    >
      <div>
        <div class="flex items-center pb-4">
          <h1 class="font-bold text-lg">{{ title }}</h1>
        </div>
        <p class="antialiased text-input-label">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: () => ''
    }
  }
}
</script>
