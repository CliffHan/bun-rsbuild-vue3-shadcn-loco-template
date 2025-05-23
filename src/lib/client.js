import ky from 'ky'
import { emitter, AuthEvents } from './events'

// 创建 ky 实例
let kyClientInstance = ky.create({
  prefixUrl: '/api',
  //   timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        // 添加认证 token
        const token = localStorage.getItem('token')
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
    afterResponse: [
      async (_request, options, response) => {
        // 对于权限问题，默认发送通知
        if (!options.skipEmit) {
          switch (response.status) {
            case 401: // 401 - 未授权（未登录或 token 失效）
              emitter.emit(AuthEvents.UNAUTHORIZED)
              break
            case 403: // 403 - 权限不足
              emitter.emit(AuthEvents.FORBIDDEN)
              break
          }
        }

        // 处理非 2xx 响应
        if (!response.ok) {
          const error = await response.json().catch(() => ({}))
          throw new Error(error.message || 'An error occurred')
        }

        return response
      },
    ],
  },
  retry: {
    limit: 2,
    methods: ['get', 'put', 'head', 'delete', 'options', 'trace'],
  },
})

export { kyClientInstance };

export function extendKyClientInstance(options) {
  // 扩展 ky 实例
  kyClientInstance = kyClientInstance.extend(options)
}

// 封装通用请求方法
export const httpClient = {
  async get(path, options = {}) {
    const response = await kyClientInstance.get(path, options)
    return response.json()
  },

  async post(path, json, options = {}) {
    const response = await kyClientInstance.post(path, { json, ...options })
    return response.json()
  },

  async put(path, json, options = {}) {
    const response = await kyClientInstance.put(path, { json, ...options })
    return response.json()
  },

  async delete(path, options = {}) {
    const response = await kyClientInstance.delete(path, options)
    return response.json()
  },

  async patch(path, json, options = {}) {
    const response = await kyClientInstance.patch(path, { json, ...options })
    return response.json()
  },
}

export default httpClient
