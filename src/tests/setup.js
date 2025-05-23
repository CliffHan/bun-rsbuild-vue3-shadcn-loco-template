import { Window } from 'happy-dom'

const window = new Window()
global.window = window
global.document = window.document
global.localStorage = window.localStorage
global.fetch = fetch // 使用 bun 的 fetch

// 设置测试环境变量
process.env.NODE_ENV = 'test'
