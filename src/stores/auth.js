import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    _token: localStorage.getItem('token'), // 初始化时读取 token
  }),

  getters: {
    token: (state) => state._token,
    isAuthenticated: (state) => !!state._token,
    isUserReady: (state) => !!state.user,
  },

  actions: {
    setUser(user) {
      this.user = user
      if (user?.token) {
        this._token = user.token // 更新内部状态
        localStorage.setItem('token', user.token) // 同步到 localStorage
      }
    },

    clearToken() {
      this._token = null
      localStorage.removeItem('token')
    },

    logout() {
      this.clearToken()
      this.user = null
    },
  },
})
