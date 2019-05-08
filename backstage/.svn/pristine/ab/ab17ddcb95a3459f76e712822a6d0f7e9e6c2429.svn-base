import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = {
  mode: 'hash',
  routes: [
    {
      name: 'bindMap',
      path: '/bindMap',
      component: () => import('@/pages/bindMap/Container')
    },
    {
      name: 'panorama',
      path: '/',
      redirect: '/bindPositions',
      component: () => import('@/pages/Panorama'),
      children: [
        {
          name: 'bindPositions',
          path: '/bindPositions',
          component: () => import('@/pages/bindPositions/Container')
        },
        {
          name: 'displayPositions',
          path: '/displayPositions',
          component: () => import('@/pages/displayPositions/DisplayContainer')
        }, 
        {
          name: 'configDesign',
          path: '/configDesign',
          component: () => import('@/pages/configDesign/Container')
        },
        {
          name: 'pressureFan',
          path: '/pressureFan',
          component: () => import('@/pages/pressureFan/Container')
        }
      ]
    }
  ]
}

export default new Router(routes)
