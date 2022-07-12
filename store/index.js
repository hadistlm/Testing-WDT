export const strict = false

export const state = () => ({
  sidebarStatus: false,
  openModal: false,
  modalId: null,
  modalDataRef: null,
  modalType: 'normal'
})

export const getters = {
  isAuthenticated (state) {
    return state.auth.loggedIn // auth object as default will be added in vuex state, when you initialize nuxt auth
  },
  getUserInfo (state) {
    return state.auth.user
  },
  getSidebarInfo (state) {
    return state.sidebarStatus
  },
  getModalInfo (state) {
    return {
      id: state.modalId,
      open: state.openModal,
      type: state.modalType,
      refs: state.modalDataRef
    }
  }
}

export const mutations = {
  sidebarToggle (state, payload) {
    state.sidebarStatus = !state.sidebarStatus
  },
  modalToggle (state, payload) {
    state.openModal = !state.openModal
    state.modalId =
      payload && Object.prototype.hasOwnProperty.call(payload, 'id')
        ? payload.id
        : null
    state.modalType =
      payload && Object.prototype.hasOwnProperty.call(payload, 'type')
        ? payload.type
        : 'normal'
    state.modalDataRef =
      payload && Object.prototype.hasOwnProperty.call(payload, 'data')
        ? payload.data
        : null
  }
}

export const actions = {
}
