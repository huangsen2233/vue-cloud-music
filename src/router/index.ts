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
    component: () => import('@/views/recommend/recommend.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    name: 'ranking',
    path: '/ranking',
    component: () => import('@/views/ranking/ranking.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    name: 'playlist',
    path: '/playlist',
    component: () => import('@/views/playlist/playlist.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    name: 'playlist-detail',
    path: '/playlist-detail',
    component: () => import('@/views/playlist-detail/playlist-detail.vue'),
    meta: {
      keepAlive: false
    }
  },
  {
    name: 'singer',
    path: '/singer',
    component: () => import('@/views/singer/singer.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    name: 'singer-detail',
    path: '/singer-detail',
    component: () => import('@/views/singer-detail/singer-detail.vue'),
    meta: {
      keepAlive: false
    }
  },
  {
    name: 'video',
    path: '/video',
    component: () => import('@/views/video/video.vue'),
    meta: {
      keepAlive: true
    }
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