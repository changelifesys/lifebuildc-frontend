import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'
// Element-ui
import 'normalize.css'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-TW'
import './styles/theme/index.css'
import './styles/index.scss'
// Lodash
import lodash from 'lodash'
// Moment
import moment from 'moment'
// Axios
import axios from 'axios'
import VueCookie from 'vue-cookie'

Vue.use(Vuex)
Vue.use(ElementUI, { locale })
Vue.use(VueCookie)
Vue.prototype.$moment = moment
Vue.prototype.$lodash = lodash
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
