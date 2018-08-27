// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import Vuex from 'vuex'

import store from './store/store'

Vue.use(Vuex)

Vue.use(Vuetify, {
  theme: {
    primary: '#000000',
    secondary: '#FFFFFF',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'https://secret-island-17002.herokuapp.com', // Your API domain
  tokenName: 'token',
  // storageType: 'localStorage',
  providers: {
    github: {
      clientId: '9d112619aac275d3cd30',
      redirectUri: 'http://localhost:8080'
    }
  }})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
