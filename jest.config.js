// @noflow
module.exports = {
  setupFiles: ["raf/polyfill", "./etc/jestSetup.js"],
  setupTestFrameworkScriptFile: "./etc/jestSetupFramework.js",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testPathIgnorePatterns: ["dist"],
  coverageReporters: ["json", "lcov", "text", "text-summary"],
  coverageThreshold: {
    global: {
      statements: 77,
      branches: 52,
      functions: 60,
      lines: 78,
    },
  },
};
