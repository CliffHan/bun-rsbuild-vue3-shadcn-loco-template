import { describe, it, expect, beforeAll } from 'bun:test'
import { authApi } from '@/api/auth'
import { extendKyClientInstance } from '@/lib/client'
import '../setup'

const prefixUrl = 'http://localhost:5150/api'

describe('Auth API', () => {
  beforeAll(() => {
    // 直接修改 kyClientInstance 的配置
    extendKyClientInstance({ prefixUrl })
    // 清除 localStorage
    localStorage.clear()
  })

  const testUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: '12341234',
  }

  let authToken

  it('should register a new user', async () => {
    const response = await authApi.register(testUser)
    expect(response).toBeDefined()
  })

  it('should login with credentials', async () => {
    const response = await authApi.login({
      email: testUser.email,
      password: testUser.password,
    })
    expect(response.token).toBeDefined()
    authToken = response.token
    localStorage.setItem('token', authToken)
  })

  it('should get current user info', async () => {
    const user = await authApi.getCurrentUser()
    expect(user).toBeDefined()
    expect(user.email).toBe(testUser.email)
  })

  // TODO: test magic link login & password reset?
})
