import Vue from 'vue'
import moment from 'moment'
import 'material-design-lite'
import VueMaterial from 'vue-material'
import Buefy from 'buefy'

Vue.use(VueMaterial)
Vue.use(Buefy)
Vue.config.productionTip = false
Vue.prototype.moment = moment
