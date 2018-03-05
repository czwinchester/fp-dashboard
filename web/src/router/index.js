import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import BuildsPage from '@/components/BuildsPage'
import Insights from '@/components/Insights'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: BuildsPage,
      metaInfo: {
        title: 'FordPass Dashboard'
      }
    },
    {
      path: '/builds',
      name: 'builds',
      component: BuildsPage
    },
    {
      path: '/insights',
      name: 'insights',
      component: Insights
      // metaInfo: {
      // title: 'My Awesome Webapp',
      // override the parent template and just use the above title only
      // titleTemplate: null
      // }
    }
  ]
})
