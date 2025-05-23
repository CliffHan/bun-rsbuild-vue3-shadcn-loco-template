import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/Register.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/pages/Forgot.vue'),
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/pages/ResetPassword.vue'),
    },
    {
      path: '/verify',
      name: 'verify',
      component: () => import('@/pages/Verify.vue'),
    },
  ],
})

// 定义需要认证的路由
const authRequiredRoutes = ['main']

// 添加全局前置守卫
router.beforeEach(async (to, from, next) => {
  console.log('==== Router Guard Start ====')
  const authStore = useAuthStore()
  const isUserReady = authStore.isUserReady
  const isAuthenticated = authStore.isAuthenticated

  // Debug info
  console.log({
    to: to.name,
    from: from.name,
    token: !!authStore.token,
    user: !!authStore.user,
    isAuthenticated: authStore.isAuthenticated,
  })

  // 目标是 loading 页，直接跳转
  if (to.name === 'loading') {
    console.log('-> Loading page, pass through')
    next()
    return
  }

  // 未登录用户访问需要认证的路由，重定向到登录页
  if (!authStore.isAuthenticated && authRequiredRoutes.includes(to.name)) {
    console.log(
      '-> Unauthenticated user trying to access protected route, redirect to login',
    )
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // 已登录用户访问需要认证的路由，且用户信息未准备好，跳转到 loading 页
  if (isAuthenticated && !isUserReady) {
    console.log(
      '-> Authenticated user, but user info not ready, redirect to loading',
    )
    next({ name: 'loading' })
    return
  }

  console.log('-> Normal navigation')
  next()
})

export default router
