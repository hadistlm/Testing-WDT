<template>
  <dialog v-show="open" class="bg-transparent flex z-50 relative">
    <div class="
      p-7
      flex
      justify-center
      items-start
      fixed
      left-0
      top-0
      w-full
      h-full
      bg-gray-900 bg-opacity-50
      z-50
    ">
      <div class="bg-white px-16 py-14 rounded-md text-center mt-28">
        <h1 class="text-xl mb-4 font-bold text-slate-500">{{ message }}</h1>
        <button @click="canceled" class="bg-indigo-500 px-4 py-2 rounded-md text-md text-white">Cancel</button>
        <button @click="approved" class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Yes</button>
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
      default: 'Undefined'
    },
    open: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    canceled () {
      this.$emit('onchange', false);
    },
    approved () {
      this.$emit('onchange', true);
    }
  }
};
</script>
