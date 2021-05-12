import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

localStorage.setItem(
  'debug',
  [
    // 'ws:connect',
    // 'ws:service',
    'hausos:*'
  ].join(',')
)

new Vue({
  render: (h) => h(App)
}).$mount('#app')
