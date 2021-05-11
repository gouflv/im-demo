import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

localStorage.setItem('debug', 'ws:*, hausos')

new Vue({
  render: (h) => h(App)
}).$mount('#app')
