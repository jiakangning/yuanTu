import Vue from 'vue'
import Router from 'vue-router'
import system from './system.js'
import run from './run.js'
import driver from './driver.js'

const mapRoutes = [{
  path: '/map',
  name: mapRoutes,
  redirect: '/gisMap',
  component: () => import('@/apps/map/Container'),
  children: [
    {
      path: '/gisMap',
      name: 'gisMap',
      component: () => import('@/apps/map/gisMap/Container')
    }, {
      path: '/unityMap',
      name: 'unityMap',
      component: () => import('@/apps/map/unity/Container')
    }
  ]
}]

const mainRoutes = mapRoutes.concat(system, run, driver)

const routes = {
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/apps/base/login/index.vue')
    },
    {
      path: '/main',
      component: () => import('@/apps/base/main/index.vue'),
      children: mainRoutes
    }
  ]
}

Vue.use(Router)

export default new Router(routes)
