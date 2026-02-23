import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            port: 3000,
            proxy: {
                '/api': {
                    target: env.VITE_API_URL || 'http://localhost:8000',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
                },
            },
        },
        build: {
            target: 'es2020',
            outDir: 'dist',
            assetsDir: 'assets',
            sourcemap: mode === 'development',
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: mode === 'production',
                    drop_debugger: mode === 'production',
                },
            },
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['vue', 'vue-router', 'pinia'],
                        ui: ['@headlessui/vue', '@heroicons/vue'],
                    },
                },
            },
        },
    }
})