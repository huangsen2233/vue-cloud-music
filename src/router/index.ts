import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { 
    path: '/', 
    redirect: '/home' 
  }, 
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/home/home.vue')
  },
  { 
    name: 'NotFound', 
    path: '/:pathMatch(.*)*', 
    component: () => import('@/views/not-found/not-found.vue') 
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router