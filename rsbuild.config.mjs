import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'

export default defineConfig({
  plugins: [pluginVue()],
  resolve: {
    alias: {
      '@': './src',
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5150',
    },
  },
  source: {
    exclude: ['**/tests/**', '**/*.test.js', '**/*.spec.js']
  },
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [require('@tailwindcss/postcss')],
      },
    },
  }
})
