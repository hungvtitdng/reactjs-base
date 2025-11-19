import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import path from 'path'
// import { fileURLToPath } from 'url'

// const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    server: {
      port: env.VITE_PORT || 3000,
      open: '/',
      strictPort: true,
    },
    plugins: [
      react(),
      checker({
        eslint: {
          lintCommand: 'eslint "src/**/*.{js,jsx}"',
        },
        overlay: {
          initialIsOpen: false,
        },
      }),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace(/<%= VITE_APP_NAME %>/g, env.VITE_APP_NAME || 'Default Title')
        },
      },
    ],
    build: {
      minify: 'terser', // Dùng Terser để minify
      terserOptions: {
        compress: {
          drop_console: true, // Xóa console.log
          drop_debugger: true, // Xóa debugger
        },
        format: {
          comments: false, // Xóa comment
        },
      },
      rollupOptions: {
        output: {
          compact: true, // Gộp tất cả vào 1 dòng
        },
      },
    },
    resolve: {
      alias: {
        '@app/pages': path.resolve(__dirname, 'src/pages'),
        '@app/api': path.resolve(__dirname, 'src/api'),
        '@app/components': path.resolve(__dirname, 'src/components'),
        '@app/route': path.resolve(__dirname, 'src/route'),
        '@app/store': path.resolve(__dirname, 'src/store'),
        '@app/assets': path.resolve(__dirname, 'src/assets'),
        '@app/utils': path.resolve(__dirname, 'src/utils'),
        '@app/config': path.resolve(__dirname, 'src/config'),
      },
    },
  }
})
