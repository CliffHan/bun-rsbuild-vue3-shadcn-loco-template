import mitt from 'mitt'

export const emitter = mitt()

export const AuthEvents = {
  UNAUTHORIZED: 'unauthorized', // 401 - 未登录或 token 失效
  FORBIDDEN: 'forbidden', // 403 - 权限不足
}
