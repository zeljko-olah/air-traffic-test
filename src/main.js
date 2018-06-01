import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http'

Object.defineProperties(Vue.prototype, {
  $http: {
    get: function () {
      return http
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
