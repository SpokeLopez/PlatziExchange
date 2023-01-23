import Vue from 'vue'
import App from './App.vue'
// El @ representa el directorio source.
import "@/assets/css/tailwind.css"
import router from "@/router"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')