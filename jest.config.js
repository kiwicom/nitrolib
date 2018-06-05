module.exports = {
  setupFiles: ["raf/polyfill", "./etc/jestSetup.js", "./etc/jestGlobals.js"],
  setupTestFrameworkScriptFile: "./etc/jestSetupFramework.js",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testPathIgnorePatterns: ["dist"],
  coverageReporters: ["json", "lcov", "text-summary"],
  coverageThreshold: {
    // Functions & branches have a problem with 'styled-components'
    global: {
      // branches: 100,
      // functions: 100,
      lines: 90,
      statements: 85,
    },
  },
};
