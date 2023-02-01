import Vue from 'vue'
import App from './App.vue'
// El @ representa el directorio source.
import "@/assets/css/tailwind.css"
import Chart from 'chart.js'
import Chartick from 'vue-chartkick'
import { VueSpinners } from '@saeris/vue-spinners'

import router from "@/router"
import { dollarfilter, percentFilter } from '@/filters'

Vue.use(VueSpinners)
Vue.use(Chartick.use(Chart))

Vue.filter('dollar', dollarfilter)
Vue.filter('percent', percentFilter)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
