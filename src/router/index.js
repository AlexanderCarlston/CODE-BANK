import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import Bank from '@/views/UserBank.vue'
import Vault from '@/views/UserVault.vue'
import Example from '@/views/ExamplePage.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/bank',
      name: 'Bank',
      component: Bank
    },
    {
      path: '/vault',
      name: 'Vault',
      component: Vault
    },
    {
      path: 'example',
      name: "Example",
      component: Example
    }
  ]
})
