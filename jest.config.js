/* eslint-disable flowtype/require-valid-file-annotation */
module.exports = {
  setupFiles: ["raf/polyfill", "./etc/jestSetup.js"],
  setupTestFrameworkScriptFile: "./etc/jestSetupFramework.js",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testPathIgnorePatterns: ["dist"],
  coverageReporters: ["json", "lcov", "text-summary"],
  coverageThreshold: {
    global: {
      statements: 71,
      branches: 43,
      functions: 47,
      lines: 72,
    },
  },
};
