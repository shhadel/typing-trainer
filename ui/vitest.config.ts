import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: { dedupe: ['react', 'react-dom'] },
  test: {
    include: ['src/**/*.test.tsx'],
    environment: 'node',
    pool: 'threads',
    maxWorkers: 1,
    coverage: {
      provider: 'v8',
      include: ['src/index.tsx'],
      exclude: ['**/*.test.tsx'],
      reporter: ['text', 'html'],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
  },
})
