import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import run from './run'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import i18n from './i18n'

Vue.use(run)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: h => h(App)
})
