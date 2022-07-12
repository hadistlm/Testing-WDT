<template>
  <dialog
    v-show="openModal"
    class="bg-transparent flex z-0 relative"
  >
    <div
      class="p-7 flex justify-center items-start fixed left-0 top-0 w-full h-full bg-gray-900 bg-opacity-50 z-50"
      :class="
        openModal
          ? 'transition-opacity duration-300 opacity-100'
          : 'transition-opacity duration-300 opacity-0'
      "
    >
      <div
        :class="{
          'lg:w-1/4': size && size === 'sm',
          'lg:w-1/2': !size || size === 'md',
          'lg:w-9/12': size && size === 'lg',
          'lg:w-11/12': size && size === 'xl'
        }"
        class="
          w-full
          bg-white
          flex
          rounded-lg
          relative
          mt-20
          lg:mt-4
        ">
        <div class="flex flex-col items-start w-full">
          <div class="p-5 flex items-start w-full">
            <div class="text-lg font-bold text-header">
              {{ modalState.title }}
            </div>
            <img
              class="ml-auto fill-current text-gray-700 w-5 h-5 cursor-pointer"
              v-show="!hideClose"
              src="@/assets/icon/core-close.svg"
              @click="closeModal"
            />
          </div>
          <hr class="w-full" />
          <div
            :class="{
              'rounded-lg': !modalState.buttons.left.show && !modalState.buttons.right.show
            }"
            class="px-3 py-3 overflow-x-hidden overflow-y-auto w-full max-h-96 bg-secondary shadow-inner"
          >
            <component v-if="typeof modalState.message === 'object'" :is="modalState.message" ref="formdata"></component>
            <p v-if="typeof modalState.message === 'string'">{{ modalState.message }}</p>
          </div>
          <div
            v-show="modalState.buttons.left.show || modalState.buttons.right.show"
            class="w-full buttom-footer"
          >
            <hr class="w-full" />
            <div class="p-5 flex justify-end items-center w-full">
              <button
                v-if="modalState.buttons.left.show !== false"
                type="button"
                :class="
                  modalState.buttons.left.type === 'primary'
                    ? 'bg-blue-500 hover:bg-blue-700 text-white'
                    : modalState.buttons.left.type === 'danger'
                    ? 'bg-red-500 hover:bg-red-700 text-white'
                    : modalState.buttons.left.type === 'success'
                    ? 'bg-green-500 hover:bg-green-700 text-white'
                    : modalState.buttons.left.type === 'warning'
                    ? 'bg-yellow-500 hover:bg-yellow-700 text-white'
                    : 'bg-gray-500 hover:bg-gray-700 text-white'
                "
                class="font-bold py-2 px-4 rounded mr-3"
                @click="submitModal"
              >
                {{ modalState.buttons.left.text || 'Submit' }}
              </button>
              <button
                v-if="modalState.buttons.right.show !== false"
                type="button"
                :class="
                  modalState.buttons.right.type === 'primary'
                    ? 'border-blue-500 hover:bg-blue-500 text-blue-700'
                    : modalState.buttons.right.type === 'danger'
                    ? 'border-red-500 hover:bg-red-500 text-red-700'
                    : modalState.buttons.right.type === 'success'
                    ? 'border-green-500 hover:bg-green-500 text-green-700'
                    : modalState.buttons.right.type === 'warning'
                    ? 'border-yellow-500 hover:bg-yellow-500 text-yellow-700'
                    : 'border-gray-500 hover:bg-gray-500 text-gray-700'
                "
                class="
                  py-2
                  px-4
                  border
                  font-semibold
                  rounded
                  bg-transparent
                  font-semibold
                  hover:text-white hover:border-transparent
                "
                @click="closeModal"
              >
                {{ modalState.buttons.right.text || 'Close' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'md'
    },
    hideClose: {
      type: Boolean,
      default: false
    },
    modalState: {
      type: Object,
      required: true
    }
  },
  computed: {
    openModal () {
      if (this.modalState.id !== this.$store.state.modalId) return false;
      return this.$store.state.openModal
    }
  },
  methods: {
    submitModal () {
      const modalBody = this.$refs.formdata
      const loaded = modalBody.getData()

      // check whenever this body need validation
      if (Object.prototype.hasOwnProperty.call(modalBody, 'validateData') && modalBody.validateData().status === 'failed') {
        return false
      }

      this.$emit('onchanged', loaded)

      this.$store.commit('modalToggle', { openModal: false })

      modalBody.resetData()
    },
    closeModal (event) {
      this.$store.commit('modalToggle', { openModal: false })

      if (this.$refs.formdata) {
        this.$refs.formdata.resetData()
      }
    }
  }
}
</script>

<style scoped>
  .text-header{
    color: #3D5A80;
  }
  .bg-secondary{
    background-color: #EFEFEF;
  }
</style>
