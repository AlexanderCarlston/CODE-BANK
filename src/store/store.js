import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import { VueAuthenticate } from 'vue-authenticate'
import axios from 'axios';

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: 'http://code-bank.surge.sh'
})
export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    logIn: false,
    loggedIn: false,
    user: {
      id: undefined,
      userName: '',
      access_token: '',
      avatar_url: '',
      bank_gists: [],
      tags: []
    }
  },

  // You can use it as a state getter function (probably the best solution)
  getters: {
    loggedIn: state => {
      return state.loggedIn
    },
    logIn: state => {
      return state.logIn
    },
    Auth: state => {
      return state.isAuthenticated
    },
    User: state => {
      return state.user
    },
    Bank: state => {
      return state.user.bank_gists
    },
    Check: (state) => (id) => {
      return state.user.bank_gists.filter(obj => obj.id === id)
    }
  },

  // Mutation for when you use it as state property
  mutations: {
    loggedIn(state, payload){
      state.loggedIn = payload.boolean
    },
    logIn(state, payload){
      state.logIn = payload.boolean
    },
    isAuthenticated (state){
      state.isAuthenticated = true
    },
    changeUser(state, payload){
      state.user[payload.property] = payload.value
    },
    AddGist(state, payload){
      state.user.bank_gists.push(payload.object)
    },
    RemoveGist(state, payload){
       state.user.bank_gists = state.user.bank_gists.filter(obj => obj.id !== payload.id)
    }
  },

  actions: {
    loggedIn(context, payload){
      context.commit('loggedIn', payload)
    },
    logIn(context, payload){
      context.commit('logIn', payload)
    },
    isAuthenticated(context){
      context.commit('isAuthenticated')
    },
    changeUser(context, payload){
      context.commit('changeUser', payload)
    },
    AddGist(context, payload){
      context.commit('AddGist', payload)
    },
    RemoveGist(context, payload){
      context.commit('RemoveGist', payload)
    }
  }
})