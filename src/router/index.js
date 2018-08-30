import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage.vue'
import Bank from '@/components/Bank.vue'
import Vaults from '@/components/Vaults.vue'
import Example from '@/components/Example.vue'
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
      path: '/vaults',
      name: 'Vaults',
      component: Vaults
    },
    {
      path: 'example',
      name: "Example",
      component: Example
    }
  ]
})
