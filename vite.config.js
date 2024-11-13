import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    https: true,
  },
  resolve: {
    alias: [
      { find: 'store', replacement: path.resolve(__dirname, 'src/store') },
      { find: 'api', replacement: path.resolve(__dirname, 'src/api') },
      { find: 'utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: 'components', replacement: path.resolve(__dirname, 'src/components') },
      { find: 'i18n', replacement: path.resolve(__dirname, 'src/i18n') },
    ],
  },
  plugins: [
    react(),
    basicSsl(),
  ],
  css: {
    scss: {
      api: 'modern',
    },
  },
});
