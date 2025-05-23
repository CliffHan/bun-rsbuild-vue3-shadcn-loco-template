import client from '@/lib/client'

export const authApi = {
  /**
   * 用户注册
   * @param {{ name: string, email: string, password: string }} data
   */
  async register(data) {
    return client.post('auth/register', data)
  },

  /**
   * 验证注册邮箱
   * @param {string} token - 验证token
   */
  async verify(token) {
    return client.get(`auth/verify/${token}`)
  },

  /**
   * 用户登录
   * @param {{ email: string, password: string }} credentials
   */
  async login(credentials, skipEmit) {
    return client.post('auth/login', credentials, { skipEmit})
  },

  /**
   * 发送忘记密码邮件
   * @param {{ email: string }} data
   */
  async forgotPassword(data) {
    return client.post('auth/forgot', data)
  },

  /**
   * 重置密码
   * @param {{ token: string, password: string }} data
   */
  async resetPassword(data) {
    return client.post('auth/reset', data)
  },

  /**
   * 获取当前用户信息
   */
  async getCurrentUser() {
    return client.get('auth/current')
  },

  /**
   * 请求魔法链接登录
   * @param {{ email: string }} data
   */
  async requestMagicLink(data) {
    return client.post('auth/magic-link', data)
  },

  /**
   * 验证魔法链接
   * @param {string} token - 魔法链接token
   */
  async verifyMagicLink(token) {
    return client.get(`auth/magic-link/${token}`)
  },
}
