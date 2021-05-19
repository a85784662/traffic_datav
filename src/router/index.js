import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: { path: '/composite' },
    children: [
      {
        path: '/composite',
        meta: { title: '综合模块' },
        component: () =>
          import(
            /* webpackChunkName: "composite" */ '../views/Composite'
          )
      },
      {
        path: '/trafficcontrol',
        meta: { title: '交通管理' },
        component: () =>
          import(
            /* webpackChunkName: "trafficcontrol" */ '../views/TrafficControl'
          )
      },
      {
        path: '/transport',
        meta: { title: '运政模块' },
        component: () =>
          import(
            /* webpackChunkName: "transport" */ '../views/Transport'
          )
      },
      {
        path: '/gangHang',
        meta: { title: '港行模块' },
        component: () =>
          import(
            /* webpackChunkName: "gangHang" */ '../views/gangHang'
          )
      },
      {
        path: '/WaterConservancy',
        meta: { title: '水利模块' },
        component: () =>
          import(
            /* webpackChunkName: "WaterConservancy" */ '../views/WaterConservancy'
          )
      },
      {
        path: '/Hangfa',
        meta: { title: '行发模块' },
        component: () =>
          import(
            /* webpackChunkName: "Hangfa" */ '../views/Hangfa'
          )
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
