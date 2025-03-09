import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ['src/sdk/**/*'],
            outDir: 'dist/sdk/types'
        }),
    ],
    define: {
        // Polyfill for process.env in browser
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
        },
        // For older libs that check process.env.NODE_ENV
        'process.env.NODE_ENV': JSON.stringify('production'),
    },
    build: {
        lib: {
            // The entry point for your SDK
            entry: resolve(__dirname, 'src/sdk/index.ts'),
            name: 'AntDesignXChatSDK',
            // Generate the formats
            formats: ['es', 'umd'],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            // Include all dependencies in the bundle instead of externalizing them
            external: [],
            output: {
                // Optimize chunk splitting
                chunkFileNames: 'chunks/[name]-[hash].js',
                manualChunks: undefined,
            },
        },
        outDir: 'dist/sdk',
        emptyOutDir: true,
        sourcemap: true,
        // Minification options
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: false,
                drop_debugger: true
            }
        }
    },
    // Resolve paths
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
});