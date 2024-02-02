import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
// import { viteSingleFile } from 'vite-plugin-singlefile';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // viteSingleFile(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // 尝试禁用压缩
    minify: false,

    target: "es2015",

    // 静态资源文件分拆到不同目录
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name].js',
        entryFileNames: 'static/js/[name].js',
        assetFileNames: 'static/[ext]/[name].[ext]',
      }
    },

    // 提高超大静态资源警告门槛
    chunkSizeWarningLimit: 2500,

    // 超大静态资源拆分
    manualChunks(id) {
      if (id.includes('node_modules')) {
        return id.toString().split('node_modules/')[1].split('/')[0].toString();
      }
    },
  }
})
