// @noflow
module.exports = {
  setupFiles: ["raf/polyfill", "jest-date-mock", "./etc/jestSetup.js"],
  setupTestFrameworkScriptFile: "./etc/jestSetupFramework.js",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testPathIgnorePatterns: ["dist"],
  coverageReporters: ["json", "lcov", "text", "text-summary"],
  coverageThreshold: {
    global: {
      statements: 76,
      branches: 49,
      functions: 57,
      lines: 76,
    },
  },
};
