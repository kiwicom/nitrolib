/* eslint-disable flowtype/require-valid-file-annotation */
module.exports = {
  setupFiles: ["raf/polyfill", "./etc/jestSetup.js"],
  setupTestFrameworkScriptFile: "./etc/jestSetupFramework.js",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testPathIgnorePatterns: ["dist"],
  coverageReporters: ["json", "lcov", "text", "text-summary"],
  coverageThreshold: {
    global: {
      statements: 76,
      branches: 51,
      functions: 58,
      lines: 77,
    },
  },
};
