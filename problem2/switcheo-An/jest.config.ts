export default {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|png)$': '<rootDir>/src/__mocks__/fileMock.ts',
    '.+\\.(svg)(\\?react)?$': '<rootDir>/src/__mocks__/svg.ts',
    '^@switcheo/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': '<rootDir>/src/__mocks__/styleMock.ts',
  },
  collectCoverageFrom: [
    'src/**/*.{jsx,tsx}',
    '!src/**/*.spec.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/node_modules/**',
    '!src/main.tsx',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
