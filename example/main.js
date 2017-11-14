import Vue from 'vue'
import App from './app.vue'
import pdUI from '../dist/pdSelect'
debugger



Vue.use(pdUI)


new Vue({
  render: h => h(App)
}).$mount('#app')
