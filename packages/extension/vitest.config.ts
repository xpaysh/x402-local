import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  esbuild: {
    // Use esbuild instead of Rollup for faster builds and fewer dependencies
    target: 'node18'
  }
});