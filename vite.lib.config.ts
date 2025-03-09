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
    build: {
        lib: {
            // The entry point for your SDK
            entry: resolve(__dirname, 'src/sdk/index.ts'),
            name: 'AntDesignXSDK',
            // Generate the formats
            formats: ['es', 'umd'],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            // Externalize peer dependencies
            external: [
                'react',
                'react-dom',
                'antd',
                '@ant-design/icons',
                '@ant-design/x',
                '@ant-design/cssinjs',
                'antd-style'
            ],
            output: {
                // Global variables for UMD build
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    antd: 'antd',
                    '@ant-design/icons': 'icons',
                    '@ant-design/x': 'AntDesignX',
                    '@ant-design/cssinjs': 'AntDesignCSSInJS',
                    'antd-style': 'antdStyle'
                },
            },
        },
        outDir: 'dist/sdk',
        emptyOutDir: true,
        sourcemap: true,
    },
});