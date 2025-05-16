import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/loading',
      name: 'loading',
      component: () => import('@/pages/Loading.vue'),
    },
    {
      path: '/',
      name: 'main',
      component: () => import('@/pages/Main.vue'),
    },
  ],
})

export default router
