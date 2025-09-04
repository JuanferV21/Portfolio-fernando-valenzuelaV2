const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '<rootDir>/__tests__/**/*.test.(js|jsx|ts|tsx)',
    '<rootDir>/src/**/*.test.(js|jsx|ts|tsx)',
  ],
};

module.exports = createJestConfig(customJestConfig);