// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import i18n from './lang'
import router from './router'
// import fastclick from 'fastclick'

// fastclick.attach(document.body)
Vue.config.productionTip = false
// Vue.use(require('vue-moment'))

let bus = new Vue()
Vue.prototype.bus = bus

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
