module.exports = {
  // Ambiente de testing
  testEnvironment: 'node',

  // Patrones de archivos de test
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],

  // Cobertura de código
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js', // Excluir archivo de inicio
    '!**/node_modules/**',
    '!**/tests/**'
  ],

  // Umbrales de cobertura
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },

  // Reportes de cobertura
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov'
  ],

  // Directorio de reportes
  coverageDirectory: 'coverage',

  // Limpiar mocks automáticamente
  clearMocks: true,

  // Configuración de setup
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

  // Tiempo máximo por test (30 segundos)
  testTimeout: 30000,

  // Verbose output
  verbose: true
};