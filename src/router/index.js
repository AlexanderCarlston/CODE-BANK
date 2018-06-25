import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/Form.vue'
import LandingPage from '@/components/LandingPage.vue'
import Bank from '@/components/Bank.vue'

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
    }
  ]
})
