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
    primary: 'black',
    secondary: 'white',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:3000', // Your API domain
  
  providers: {
    github: {
      clientId: '8152cb35e38e71e9bbf3',
      redirectUri: 'http://localhost:8080/auth/callback' // Your client app URL
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
