import Vue from 'vue'

// 애플리케이션 내에서 Vuex 라이브러리를 사용할 수 있도록 등록해준다.
import Vuex from 'vuex'

import state from './states.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})