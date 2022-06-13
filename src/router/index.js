import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReqresView from '../views/ReqresView.vue'
import BikeListView from '../views/BikeListView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/reqres',
    name: 'Reqres',
    component: ReqresView
  },
  {
    path: '/bike1',
    name: 'TDX Bike list',
    component: BikeListView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
