import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.ts.{ts,tsx}',
    '!<rootDir>/src/**/main/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*{.interface,.enum,.styles,.type}.ts',
    '!<rootDir>/**/{mui,icons,emotion}/**/*.{ts,tsx}',
    '!./pages/**',
    '!**/*.d.ts',
    '!<rootDir>/src/pages/**/*.{ts,tsx}',
    '!<rootDir>/src/styles/**/*.{ts,tsx}',
    '!<rootDir>/src/config/**/*.{ts,tsx}',
    '!<rootDir>/src/app/infra/utils/date/format.util.ts',
    '!<rootDir>/src/app/infra/utils/date/locale-pt-br.util.ts',
    '!<rootDir>/src/app/infra/utils/date/sub-days.util.ts',
    '!<rootDir>/src/app/infra/utils/date/add-days.util.ts'
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
    '\\.(css|sass|scss)$': 'identity-obj-proxy'
  }
};

export default config;
