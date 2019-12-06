import Vue from 'vue'
import App from './App.vue'

// store를 가져와 import한다.
import store from './store'

new Vue({
  el: '#app',

  // Vue 인스턴스에 store 옵션으로 등록한다.
  store,
  render: h => h(App)
})
