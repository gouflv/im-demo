import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)

localStorage.setItem(
  'debug',
  [
    'ws:connect',
    'ws:service',
    'hausos:*',
    'ChatService',
    'useInViewDetect'
  ].join(',')
)

new Vue({
  render: (h) => h(App)
}).$mount('#app')
