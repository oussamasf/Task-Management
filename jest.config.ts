module.exports = {
  testEnvironment: 'node',

  testRegex: ['test/app.e2e-spec.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  verbose: true,
  silent: true,

  bail: 1,
  testTimeout: 60000,
  forceExit: true,

  // runInBand: true,
  // clearMocks: true,
  // resetMocks: true,
  // restoreMocks: true,
};
