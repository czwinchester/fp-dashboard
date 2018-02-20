// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import 'font-awesome/css/font-awesome.css'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import lodash from 'lodash';

Vue.use(VueMaterial)
Vue.use(Buefy)
Vue.config.productionTip = false
Vue.prototype.moment = moment
Object.defineProperty(Vue.prototype, '$_', { value: lodash });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
