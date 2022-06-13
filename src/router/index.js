import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReqresView from '../views/ReqresView.vue'
import BikeListView from '../views/BikeListView.vue'
import BikeListAsyncView from '../views/BikeListAsyncView.vue'
import BikeMapView from '../views/BikeMapView.vue'

import WeatherView from '../views/WeatherView.vue'

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
    name: 'TDX-Bike',
    component: BikeListView
  },
  {
    path: '/bike2',
    name: 'TDX-Bike:Async寫法',
    component: BikeListAsyncView
  },
  {
    path: '/bikeMap',
    name: 'TDX-BikeMap',
    component: BikeMapView
  },
  {
    path: '/weather',
    name: 'Weather',
    component: WeatherView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
