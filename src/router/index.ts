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
    },
    children: [
      {
        name: 'detail',
        path: 'detail',
        component: () => import('@/views/playlist/detail.vue'),
      }
    ]
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
      keepAlive: false
    }
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/search/search.vue'),
    meta: {
      keepAlive: false
    }
  },
  {
    name: 'song-detail',
    path: '/song-detail',
    component: () => import('@/views/song-detail/song-detail.vue'),
    meta: {
      keepAlive: false
    }
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('@/views/profile/profile.vue'),
    meta: {
      keepAlive: false
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

// 使用全局后置路由将页面滚动到顶部
router.afterEach((to, from) => {
  // document.documentElement.scrollTop = 0
  window.scrollTo(0,0);
});

export default router