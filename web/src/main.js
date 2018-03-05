// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import 'font-awesome/css/font-awesome.css'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import lodash from 'lodash'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import VueI18n from 'vue-i18n'
// import lang from '../i18n/lang'

Vue.use(VueMaterial)
Vue.use(Buefy)
Vue.use(VueI18n)
Vue.config.productionTip = false
Vue.prototype.moment = moment
Object.defineProperty(Vue.prototype, '$_', { value: lodash })

// Ready translated locale messages
const messages = {
  en: {
    day: 'day | days',
    month: 'month | months'
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en-GB', // set locale
  messages: messages // set locale messages
})

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
