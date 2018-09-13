import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sideBarCollapse: true,
    sidebarIndex: 0
  },
  mutations: {
    showSideBar (state) {
      state.sideBarCollapse = true
    },
    hideSideBar (state) {
      state.sideBarCollapse = false
    },
    updateSideBarIndex (state, idx) {
      state.sidebarIndex = idx
    }
  }
})

export default store
