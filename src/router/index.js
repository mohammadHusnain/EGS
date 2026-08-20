import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
    meta: { public: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/Dashboard.vue'),
    meta: { title: 'Dashboard' }
  },
  {
    path: '/casino-lobby',
    name: 'CasinoLobby',
    component: () => import('@/pages/CasinoLobby.vue'),
    meta: { title: 'Casino Lobby' }
  },
  {
    path: '/game-shows-check-temp',
    name: 'GameShowsCheckTemp',
    component: () => import('@/pages/GameShows.vue'),
    meta: { title: 'Game Shows' }
  },
  {
    path: '/game-providers',
    name: 'GameProviders',
    component: () => import('@/pages/GameProviders.vue'),
    meta: { title: 'Game Providers' }
  },
  // Legacy paths kept as redirects so any old links/bookmarks still resolve.
  { path: '/template-a', redirect: '/casino-lobby' },
  { path: '/template-b', redirect: '/game-providers' },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!to.meta.public && !auth.isAuthenticated) {
    return { name: 'Login' }
  }
  if (to.name === 'Login' && auth.isAuthenticated) {
    return { name: 'Dashboard' }
  }
  return true
})

export default router
