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
    Dashboard
  </div>
</template>

<script>
export default {
  name: 'DashboardPage',
  middleware: 'isAuthenticated',
  data () {
    return {
      testing: 'return value'
    }
  }
}
</script>

<style scoped></style>
