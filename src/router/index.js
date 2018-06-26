import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/Form.vue'
import LandingPage from '@/components/LandingPage.vue'
import Bank from '@/components/Bank.vue'
import Loading from '@/components/Loading.vue'
import Vaults from '@/components/Vaults.vue'
import VaultLoading from '@/components/VaultLoading.vue'
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
      path: '/loading',
      name: 'Loading',
      component: Loading
    },
    {
      path: '/vaultloading',
      name: 'VaultLoading',
      component: VaultLoading
    },
    {
      path: '/vaults',
      name: 'Vaults',
      component: Vaults
    }
  ]
})
