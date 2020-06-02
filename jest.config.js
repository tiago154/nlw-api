module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  testMatch: [
    '**/__tests__/**/*.test.ts'
  ],
  verbose: true,
  collectCoverageFrom: [
    '**/src/**/*.ts'
  ]
}
