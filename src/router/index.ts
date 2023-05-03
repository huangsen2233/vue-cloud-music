import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { 
    path: '/', 
    redirect: '/recommend' 
  }, 
  {
    name: 'recommend',
    path: '/recommend',
    component: () => import('@/views/recommend/recommend.vue')
  },
  {
    name: 'ranking',
    path: '/ranking',
    component: () => import('@/views/ranking/ranking.vue')
  },
  {
    name: 'playlist',
    path: '/playlist',
    component: () => import('@/views/playlist/playlist.vue')
  },
  {
    name: 'playlist-detail',
    path: '/playlist-detail',
    component: () => import('@/views/playlist-detail/playlist-detail.vue')
  },
  {
    name: 'singer',
    path: '/singer',
    component: () => import('@/views/singer/singer.vue')
  },
  {
    name: 'singer-detail',
    path: '/singer-detail',
    component: () => import('@/views/singer-detail/singer-detail.vue')
  },
  {
    name: 'video',
    path: '/video',
    component: () => import('@/views/video/video.vue')
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