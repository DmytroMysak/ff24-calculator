import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@services': path.resolve(__dirname, './src/services'),
      '': path.resolve(__dirname, './src/utils/index.ts'),
      '@constants': path.resolve(__dirname, './src/constants/index.ts'),
      '@types': path.resolve(__dirname, './src/types/index.ts'),
    },
  },
});
