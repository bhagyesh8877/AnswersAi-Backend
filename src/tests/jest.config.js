module.exports = {
    // The root of your source code, typically /src
    roots: ['<rootDir>/src'],
  
    // Jest transformations -- this adds support for TypeScript using ts-jest
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
  
    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  
    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
    // Coverage configuration
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  
    // Indicates whether each individual test should be reported during the run
    verbose: true,
  
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
  
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['/node_modules/'],
  
    // An array of file extensions your modules use
    moduleFileExtensions: ['ts', 'tsx', 'js'],
  
    // The test environment that will be used for testing
    testEnvironment: 'node',
  
    // A map from regular expressions to paths to transformers
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
  
    // Setup files to run some code before the test suite executes
    setupFiles: ['<rootDir>/src/test/setup.ts'],
  };
  