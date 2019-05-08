import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import store from './store'
import router from './router'

import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
